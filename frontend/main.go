package main

import (
	"context"
	"log"
	"net/http"
	"text/template"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Product struct {
	ID          string  `bson:"_id,omitempty"`
	Name        string  `bson:"name"`
	Description string  `bson:"description"`
	Price       float64 `bson:"price"`
	Stock       int     `bson:"stock"`
}

type Order struct {
	ID         string    `bson:"_id,omitempty"`
	Name       string    `bson:"name"`
	Address    string    `bson:"address"`
	Products   []string  `bson:"products"`
	Total      float64   `bson:"total"`
	Date       time.Time `bson:"date"`
}

var (
	client         *mongo.Client
	productsDB     *mongo.Collection
	ordersDB       *mongo.Collection
	templates      *template.Template
)

func init() {
	// MongoDB Connection
	ctx := context.Background()
	clientOptions := options.Client().ApplyURI("mongodb://localhost:27017")
	var err error
	client, err = mongo.Connect(ctx, clientOptions)
	if err != nil {
		log.Fatal(err)
	}

	database := client.Database("Online_Store")
	productsDB = database.Collection("products")
	ordersDB = database.Collection("orders")

	// Load templates
	templates = template.Must(template.ParseGlob("templates/*.html"))
}

func main() {
	http.HandleFunc("/", homeHandler)
	http.HandleFunc("/products", productsHandler)
	http.HandleFunc("/product/", productDetailHandler)
	http.HandleFunc("/order", orderHandler)
	http.HandleFunc("/confirm-order", confirmOrderHandler)

	log.Println("🐧 Penguin Store started at http://localhost:8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
}

func homeHandler(w http.ResponseWriter, r *http.Request) {
	templates.ExecuteTemplate(w, "home.html", nil)
}

func productsHandler(w http.ResponseWriter, r *http.Request) {
	ctx := context.Background()
	cursor, err := productsDB.Find(ctx, bson.M{})
	if err != nil {
		http.Error(w, "Error fetching products", http.StatusInternalServerError)
		return
	}
	defer cursor.Close(ctx)

	var products []Product
	if err = cursor.All(ctx, &products); err != nil {
		http.Error(w, "Error loading products", http.StatusInternalServerError)
		return
	}

	templates.ExecuteTemplate(w, "products.html", products)
}

func productDetailHandler(w http.ResponseWriter, r *http.Request) {
    productID := r.URL.Path[len("/product/"):]
    
    // Convert productID to ObjectID if your MongoDB uses ObjectID
    objectID, err := primitive.ObjectIDFromHex(productID)
    if err != nil {
        log.Printf("Invalid product ID: %v", err)
        http.Error(w, "Invalid Product ID", http.StatusBadRequest)
        return
    }

    var product Product
    ctx := context.Background()
    err = productsDB.FindOne(ctx, bson.M{"_id": objectID}).Decode(&product)
    
    if err != nil {
        log.Printf("Product not found error: %v", err)
        http.Error(w, "Product not found", http.StatusNotFound)
        return
    }

    templates.ExecuteTemplate(w, "product_detail.html", product)
}

func orderHandler(w http.ResponseWriter, r *http.Request) {
	ctx := context.Background()
	cursor, err := productsDB.Find(ctx, bson.M{})
	if err != nil {
		http.Error(w, "Error fetching products", http.StatusInternalServerError)
		return
	}
	defer cursor.Close(ctx)

	var products []Product
	if err = cursor.All(ctx, &products); err != nil {
		http.Error(w, "Error loading products", http.StatusInternalServerError)
		return
	}

	templates.ExecuteTemplate(w, "order.html", products)
}

func confirmOrderHandler(w http.ResponseWriter, r *http.Request) {
    if r.Method != http.MethodPost {
        http.Redirect(w, r, "/order", http.StatusSeeOther)
        return
    }
    // Process order form
    name := r.FormValue("name")
    address := r.FormValue("address")
    selectedProducts := r.Form["products"]
    // Log selected products
    log.Printf("Selected Products: %v", selectedProducts)
    // Calculate total
    var total float64
    ctx := context.Background()
    for _, productID := range selectedProducts {
        var product Product
        // Convert to ObjectID
        objectID, err := primitive.ObjectIDFromHex(productID)
        if err != nil {
            log.Printf("Invalid product ID: %v", err)
            continue
        }
        err = productsDB.FindOne(ctx, bson.M{"_id": objectID}).Decode(&product)
        if err != nil {
            log.Printf("Error finding product %s: %v", productID, err)
            continue
        }
        // Log individual product price
        log.Printf("Product %s price: %.2f", product.Name, product.Price)
        total += product.Price
    }
    log.Printf("Total calculated: %.2f", total)
    // Create order
    order := Order{
        Name:       name,
        Address:    address,
        Products:   selectedProducts,
        Total:      total,
        Date:       time.Now(),
    }
    _, err := ordersDB.InsertOne(ctx, order)
    if err != nil {
        http.Error(w, "Error creating order", http.StatusInternalServerError)
        return
    }
    templates.ExecuteTemplate(w, "confirmation.html", order)
}
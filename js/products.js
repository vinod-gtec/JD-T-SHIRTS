// Product data in JSON format
const products = [
    {
        id: "tshirt-001",
        name: "Classic Cotton T-Shirt",
        description: "Premium quality cotton t-shirt with a comfortable fit and classic design.",
        price: 29.99,
        image: "images/products/ccts.webp",
        category: "tshirt",
        colors: ["White", "Black", "Navy", "Gray", "Red"],
        sizes: ["S", "M", "L", "XL", "XXL"],
        featured: true
    },
    {
        id: "tshirt-002",
        name: "Vintage Logo T-Shirt",
        description: "Soft cotton t-shirt featuring our vintage logo design on the front.",
        price: 34.99,
        image: "images/products/vlts.webp",
        category: "tshirt",
        colors: ["Black", "White", "Red", "Navy"],
        sizes: ["S", "M", "L", "XL"],
        featured: false
    },
    {
        id: "tshirt-003",
        name: "Premium Fitted T-Shirt",
        description: "Slim-fit premium t-shirt made from high-quality cotton blend fabric.",
        price: 39.99,
        image: "images/products/sfts.webp",
        category: "tshirt",
        colors: ["Navy", "Charcoal", "Burgundy", "White"],
        sizes: ["S", "M", "L", "XL", "XXL"],
        featured: true
    },
    {
        id: "polo-001",
        name: "Classic Piqué Polo Shirt",
        description: "Timeless polo shirt crafted from soft piqué cotton with a clean, tailored fit.",
        price: 49.99,
        image: "images/products/classic_black.jpeg",
        category: "polo",
        colors: ["Navy", "White", "Black", "Green", "Gray"],
        sizes: ["S", "M", "L", "XL", "XXL"],
        featured: true
    },
    {
        id: "polo-002",
        name: "Slim Fit Polo Shirt",
        description: "Modern slim-fit polo shirt with contrast collar and cuff details.",
        price: 54.99,
        image: "images/products/pssf.webp",
        category: "polo",
        colors: ["Light Blue", "Gray", "Navy", "White"],
        sizes: ["S", "M", "L", "XL"],
        featured: false
    },
    {
        id: "hoodie-001",
        name: "Premium Zip Hoodie",
        description: "Luxurious zip-up hoodie made from premium cotton blend with a soft brushed interior.",
        price: 69.99,
        image: "images/products/pzh.jpg",
        category: "hoodie",
        colors: ["Black", "Gray", "Navy", "Burgundy"],
        sizes: ["S", "M", "L", "XL", "XXL"],
        featured: true
    },
    {
        id: "hoodie-002",
        name: "Classic Pullover Hoodie",
        description: "Comfortable pullover hoodie with kangaroo pocket and embroidered logo.",
        price: 59.99,
        image: "images/products/poh.webp",
        category: "hoodie",
        colors: ["Burgundy", "Forest Green", "Charcoal", "Black"],
        sizes: ["S", "M", "L", "XL"],
        featured: false
    },
    {
        id: "tshirt-004",
        name: "Long Sleeve Henley",
        description: "Stylish long sleeve henley t-shirt with button placket and ribbed cuffs.",
        price: 44.99,
        image: "images/products/lsh.webp",
        category: "tshirt",
        colors: ["Olive", "Navy", "Rust", "White"],
        sizes: ["S", "M", "L", "XL"],
        featured: true
    },
    {
        id: "tshirt-005",
        name: "Graphic Print T-Shirt",
        description: "Trendy graphic print t-shirt with unique artwork and premium cotton fabric.",
        price: 32.99,
        image: "images/products/gpts.webp",
        category: "tshirt",
        colors: ["Black", "White", "Gray", "Navy"],
        sizes: ["S", "M", "L", "XL", "XXL"],
        featured: true
    }
];

// Custom T-shirt base price
const customTshirtBasePrice = 25.00;

// Function to get product by ID
function getProductById(id) {
    return products.find(product => product.id === id);
}

// Function to filter products by category
function getProductsByCategory(category) {
    if (category === 'all') {
        return products;
    }
    return products.filter(product => product.category === category);
}

// Function to get featured products
function getFeaturedProducts() {
    return products.filter(product => product.featured);
}

// Function to format price
function formatPrice(price) {
    return '$' + price.toFixed(2);
}
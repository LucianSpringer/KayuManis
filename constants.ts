import { Product, Review } from './types';

export const PRODUCTS: Product[] = [
    {
        id: 1,
        name: "Roti Sobek Manis",
        description: "Soft, fluffy pull-apart bread with sweet butter filling.",
        price: 25000,
        category: "Bread",
        image: "https://picsum.photos/400/400?random=1",
        rating: 4.8,
        reviews: 120,
        ingredients: ["Flour", "Milk", "Butter", "Sugar", "Yeast"],
        isBestSeller: true,
        stock: 50,
        variants: [
            {
                name: "Flavor",
                options: [
                    { label: "Original Butter", priceModifier: 0 },
                    { label: "Chocolate Filling", priceModifier: 5000 },
                    { label: "Cheese Filling", priceModifier: 5000 }
                ]
            }
        ]
    },
    {
        id: 2,
        name: "Classic Chocolate Tart",
        description: "Rich dark chocolate ganache on a buttery crust.",
        price: 150000,
        category: "Cake",
        image: "https://picsum.photos/400/400?random=2",
        rating: 4.9,
        reviews: 85,
        ingredients: ["Dark Chocolate", "Cream", "Flour", "Eggs"],
        isBestSeller: true,
        stock: 20,
        variants: [
            {
                name: "Size",
                options: [
                    { label: "Diameter 16cm", priceModifier: 0 },
                    { label: "Diameter 20cm", priceModifier: 100000 },
                    { label: "Diameter 24cm", priceModifier: 200000 }
                ]
            },
            {
                name: "Message",
                options: [
                    { label: "No Message", priceModifier: 0 },
                    { label: "Happy Birthday", priceModifier: 0 },
                    { label: "Custom (Note)", priceModifier: 0 }
                ]
            }
        ]
    },
    {
        id: 3,
        name: "Butter Croissant",
        description: "Authentic French croissant, crispy on the outside, soft inside.",
        price: 18000,
        category: "Pastry",
        image: "https://picsum.photos/400/400?random=3",
        rating: 4.7,
        reviews: 200,
        ingredients: ["Flour", "Butter", "Yeast", "Milk", "Salt"],
        isBestSeller: true,
        stock: 0
    },
    {
        id: 4,
        name: "Sourdough Loaf",
        description: "Naturally leavened artisan bread with a crusty exterior.",
        price: 45000,
        category: "Bread",
        image: "https://picsum.photos/400/400?random=4",
        rating: 4.6,
        reviews: 50,
        ingredients: ["Whole Wheat Flour", "Water", "Salt", "Sourdough Starter"],
        stock: 15
    },
    {
        id: 5,
        name: "Strawberry Cheesecake",
        description: "Creamy cheesecake topped with fresh strawberry glaze.",
        price: 180000,
        category: "Cake",
        image: "https://picsum.photos/400/400?random=5",
        rating: 4.9,
        reviews: 110,
        ingredients: ["Cream Cheese", "Graham Crackers", "Strawberries", "Sugar", "Eggs"],
        stock: 10
    },
    {
        id: 6,
        name: "Cheese Twist",
        description: "Savory puff pastry twisted with cheddar and parmesan.",
        price: 15000,
        category: "Snack",
        image: "https://picsum.photos/400/400?random=6",
        rating: 4.5,
        reviews: 40,
        ingredients: ["Puff Pastry", "Cheddar Cheese", "Parmesan", "Egg Wash"],
        stock: 30
    },
    {
        id: 7,
        name: "Pandan Chiffon Cake",
        description: "Light and airy sponge cake infused with natural pandan juice.",
        price: 65000,
        category: "Cake",
        image: "https://picsum.photos/400/400?random=7",
        rating: 4.8,
        reviews: 95,
        ingredients: ["Flour", "Pandan Juice", "Coconut Milk", "Sugar", "Eggs"],
        stock: 5
    },
    {
        id: 8,
        name: "Beef Sausage Roll",
        description: "Premium beef sausage wrapped in flaky pastry.",
        price: 22000,
        category: "Snack",
        image: "https://picsum.photos/400/400?random=8",
        rating: 4.6,
        reviews: 60,
        ingredients: ["Beef Sausage", "Puff Pastry", "Egg", "Sesame Seeds"],
        stock: 25
    },
    {
        id: 10,
        name: "Flash Sale: Choco Lava Box",
        description: "Melt-in-your-mouth chocolate lava cake. Limited time offer!",
        price: 85000,
        category: "Cake",
        image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        rating: 4.9,
        reviews: 230,
        ingredients: ["Dark Chocolate", "Butter", "Eggs", "Flour"],
        isBestSeller: true,
        stock: 15,
        isFlashSale: true,
        flashSalePrice: 49000,
        flashSaleEndTime: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() // 24 hours from now
    },
    {
        id: 11,
        name: "Pre-Order: Christmas Hamper",
        description: "Exclusive Christmas hamper with 3 jars of cookies and a greeting card. Ships Dec 20th.",
        price: 350000,
        category: "Snack",
        image: "https://images.unsplash.com/photo-1513201099705-a9746e1e201f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        rating: 5.0,
        reviews: 0,
        ingredients: ["Nastar", "Kaastengels", "Putri Salju"],
        stock: 100,
        isPreOrder: true,
        preOrderDate: "20 Dec 2025"
    },
    {
        id: 12,
        name: "Family Breakfast Bundle",
        description: "Complete breakfast set: 1 Loaf Bread, 1 Jam, 4 Croissants.",
        price: 120000,
        category: "Bread",
        image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        rating: 4.7,
        reviews: 45,
        ingredients: ["Mixed Breads", "Strawberry Jam"],
        stock: 20
    }
];

export const TESTIMONIALS: Review[] = [
    { id: 1, user: "Sarah A.", comment: "The best croissants in town! Reminds me of Paris.", rating: 5, date: "2023-10-10", productId: 3 },
    { id: 2, user: "Budi S.", comment: "Roti sobeknya lembut banget, anak-anak suka.", rating: 5, date: "2023-11-05", productId: 1 },
    { id: 3, user: "Jessica W.", comment: "Ordered a birthday cake and it was perfect. Not too sweet.", rating: 4, date: "2023-12-01", productId: 2 },
];

export const BLOG_POSTS = [
    {
        id: 1,
        title: "The Secret to Fluffy Croissants",
        excerpt: "Learn the techniques behind our famous butter croissants and how you can try them at home.",
        image: "https://picsum.photos/400/300?random=10",
        date: "2023-10-01",
        author: "Chef Baker"
    },
    {
        id: 2,
        title: "Why Sourdough is Good for You",
        excerpt: "Discover the health benefits of natural fermentation in our artisan sourdough bread.",
        image: "https://picsum.photos/400/300?random=11",
        date: "2023-10-15",
        author: "Nutritionist Jane"
    },
    {
        id: 3,
        title: "Holiday Cake Trends 2023",
        excerpt: "From minimalist designs to bold flavors, here are the top cake trends this holiday season.",
        image: "https://picsum.photos/400/300?random=12",
        date: "2023-11-01",
        author: "KayuManis Team"
    }
];

export const STAFF = [
    { id: 1, name: "Budi Santoso", role: "Head Baker", status: "Active", currentTask: "Mixing Dough" },
    { id: 2, name: "Siti Aminah", role: "Pastry Chef", status: "Active", currentTask: "Decorating Cakes" },
    { id: 3, name: "Joko Widodo", role: "Driver", status: "On Delivery", currentTask: "Delivering Order #123" },
    { id: 4, name: "Rina Wati", role: "Cashier", status: "Break", currentTask: "-" },
];

export const KITCHEN_TASKS = [
    { id: 1, orderId: "#ORD-001", item: "Birthday Cake", status: "In Progress", assignee: "Siti Aminah", deadline: "14:00" },
    { id: 2, orderId: "#ORD-002", item: "50 Croissants", status: "Pending", assignee: "-", deadline: "16:00" },
    { id: 3, orderId: "#ORD-003", item: "Sourdough Bread", status: "Completed", assignee: "Budi Santoso", deadline: "10:00" },
];
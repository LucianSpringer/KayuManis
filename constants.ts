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
        isBestSeller: true
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
        ingredients: ["Dark Chocolate", "Cream", "Flour", "Butter", "Eggs"],
        isBestSeller: true
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
        isBestSeller: true
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
        ingredients: ["Whole Wheat Flour", "Water", "Salt", "Sourdough Starter"]
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
        ingredients: ["Cream Cheese", "Graham Crackers", "Strawberries", "Sugar", "Eggs"]
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
        ingredients: ["Puff Pastry", "Cheddar Cheese", "Parmesan", "Egg Wash"]
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
        ingredients: ["Flour", "Pandan Juice", "Coconut Milk", "Sugar", "Eggs"]
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
        ingredients: ["Beef Sausage", "Puff Pastry", "Egg", "Sesame Seeds"]
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
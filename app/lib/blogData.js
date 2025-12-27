// app/lib/blogData.js
export const blogPosts = [
  {
    id: 1,
    slug: "the-art-of-floral-arrangement",
    title: "The Art of Floral Arrangement: A Beginner's Guide",
    excerpt:
      "Learn the basics of creating stunning floral arrangements that bring joy to any space.",
    content: `
      <h2>Introduction to Floral Design</h2>
      <p>Floral arrangement is more than just placing flowers in a vase—it's an art form that combines color, texture, and balance. Whether you're creating a simple bouquet for your dining table or an elaborate centerpiece for a special occasion, understanding the fundamentals can elevate your designs.</p>
      
      <h2>Essential Tools You'll Need</h2>
      <ul>
        <li>Floral shears or sharp scissors</li>
        <li>Floral tape and wire</li>
        <li>Various vases and containers</li>
        <li>Floral foam (for larger arrangements)</li>
        <li>Waterproof tape</li>
      </ul>
      
      <h2>Choosing Your Flowers</h2>
      <p>Start with a focal flower, add secondary flowers for support, and include filler flowers for texture. Consider seasonal blooms for freshness and sustainability.</p>
      
      <h2>Color Theory in Floral Design</h2>
      <p>Understanding color harmony can make your arrangements more visually appealing. Consider monochromatic, complementary, or analogous color schemes.</p>
    `,
    author: "Sarah Chen",
    authorRole: "Head Florist",
    date: "2024-03-15",
    readTime: "5 min read",
    category: "Tutorials",
    tags: ["floral design", "beginners", "arrangement"],
    image: "https://images.unsplash.com/photo-1566438480900-0609be27a4be?w=600",
    featured: true,
  },
  {
    id: 2,
    slug: "seasonal-blooms-spring",
    title: "Top 5 Spring Blooms to Brighten Your Home",
    excerpt:
      "Discover the best spring flowers that will add color and fragrance to your living space.",
    content: `
      <h2>Welcome Spring with Fresh Blooms</h2>
      <p>Spring brings a renewal of life and color, making it the perfect time to refresh your home with seasonal flowers. Here are our top picks for spring blooms that are both beautiful and long-lasting.</p>
      
      <h2>1. Tulips</h2>
      <p>Tulips symbolize perfect love and come in almost every color imaginable. They continue to grow after being cut, creating elegant, curving stems.</p>
      
      <h2>2. Daffodils</h2>
      <p>These cheerful yellow flowers symbolize new beginnings. They're excellent as cut flowers and can last up to a week with proper care.</p>
      
      <h2>3. Peonies</h2>
      <p>Known for their lush, full blooms and sweet fragrance, peonies are a spring favorite. They come in shades of pink, white, and red.</p>
      
      <h2>4. Lilacs</h2>
      <p>With their distinctive fragrance and delicate clusters, lilacs are perfect for creating romantic arrangements.</p>
      
      <h2>5. Cherry Blossoms</h2>
      <p>While more challenging to find as cut flowers, cherry blossom branches create stunning, dramatic arrangements.</p>
    `,
    author: "Michael Rodriguez",
    authorRole: "Garden Expert",
    date: "2024-03-10",
    readTime: "4 min read",
    category: "Seasonal",
    tags: ["spring", "seasonal", "home decor"],
    image: "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w-600",
    featured: true,
  },
  {
    id: 3,
    slug: "flower-care-tips",
    title: "7 Expert Tips to Make Your Flowers Last Longer",
    excerpt:
      "Simple yet effective techniques to extend the life of your cut flowers.",
    content: `
      <h2>Extend the Beauty of Your Blooms</h2>
      <p>Nothing brightens a room quite like fresh flowers, but their beauty can be fleeting. With these expert tips, you can help your cut flowers stay vibrant for days—or even weeks—longer.</p>
      
      <h2>1. Cut Stems at an Angle</h2>
      <p>Always cut flower stems at a 45-degree angle. This increases the surface area for water absorption and prevents stems from sitting flat at the bottom of the vase.</p>
      
      <h2>2. Remove Foliage Below Water Line</h2>
      <p>Leaves sitting in water will decay and promote bacterial growth, which shortens flower life. Remove any leaves that would be submerged.</p>
      
      <h2>3. Use Lukewarm Water</h2>
      <p>Most flowers absorb lukewarm water more efficiently than cold water. Exceptions include bulb flowers like tulips and daffodils, which prefer cold water.</p>
      
      <h2>4. Change Water Regularly</h2>
      <p>Change the water every 2-3 days to prevent bacterial buildup. Add fresh flower food with each water change.</p>
      
      <h2>5. Keep Away from Heat and Direct Sunlight</h2>
      <p>Place arrangements in cool spots away from direct sunlight, heating vents, and appliances that generate heat.</p>
      
      <h2>6. Recut Stems When Changing Water</h2>
      <p>Each time you change the water, recut the stems to remove any clogged ends and improve water uptake.</p>
      
      <h2>7. Use Flower Food Properly</h2>
      <p>Flower food provides nutrients and inhibits bacterial growth. Follow package instructions for the correct dilution.</p>
    `,
    author: "Emma Wilson",
    authorRole: "Floral Care Specialist",
    date: "2024-03-05",
    readTime: "6 min read",
    category: "Care Tips",
    tags: ["flower care", "tips", "longevity"],
    image: "https://images.unsplash.com/photo-1567306301408-9b74779a11af?w=600",
    featured: false,
  },
  {
    id: 4,
    slug: "sustainable-floristry",
    title: "The Rise of Sustainable Floristry",
    excerpt: "How eco-friendly practices are transforming the flower industry.",
    content: `
      <h2>Embracing Sustainability in Floral Design</h2>
      <p>The floral industry is undergoing a green transformation, with more florists and consumers embracing sustainable practices. Here's how you can make eco-friendly choices with your flowers.</p>
      
      <h2>Choosing Locally Grown Flowers</h2>
      <p>Locally grown flowers have a smaller carbon footprint than imported blooms. They're also fresher and support local farmers.</p>
      
      <h2>Seasonal Selections</h2>
      <p>Choosing flowers that are in season naturally reduces the need for artificial growing conditions and long-distance transportation.</p>
      
      <h2>Compostable Packaging</h2>
      <p>Look for florists who use biodegradable wrapping, recycled paper, or reusable containers instead of plastic.</p>
      
      <h2>Flower Foam Alternatives</h2>
      <p>Traditional floral foam is non-biodegradable and contains microplastics. Alternatives include chicken wire, reusable flower frogs, and biodegradable foams.</p>
      
      <h2>Dried and Preserved Flowers</h2>
      <p>Dried flowers offer longevity without maintenance and can be composted at the end of their life.</p>
    `,
    author: "David Park",
    authorRole: "Sustainability Advocate",
    date: "2024-02-28",
    readTime: "7 min read",
    category: "Sustainability",
    tags: ["sustainability", "eco-friendly", "industry"],
    image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=600",
    featured: false,
  },
  {
    id: 5,
    slug: "meaning-of-flowers",
    title: "The Language of Flowers: What Your Bouquet Really Says",
    excerpt:
      "Discover the hidden meanings behind popular flowers and create meaningful arrangements.",
    content: `
      <h2>Floriography: The Victorian Language of Flowers</h2>
      <p>During the Victorian era, flowers were used to send coded messages, allowing people to express feelings that couldn't be spoken aloud. This tradition, called floriography, is making a comeback.</p>
      
      <h2>Roses: Beyond Romance</h2>
      <p>While red roses symbolize romantic love, different colors convey different messages: yellow for friendship, white for purity, and pink for gratitude.</p>
      
      <h2>Lilies: Purity and Renewal</h2>
      <p>White lilies represent purity and virtue, while tiger lilies symbolize confidence and pride.</p>
      
      <h2>Sunflowers: Adoration and Loyalty</h2>
      <p>These bright blooms symbolize adoration, loyalty, and longevity—perfect for expressing steadfast friendship.</p>
      
      <h2>Tulips: Perfect Love</h2>
      <p>Different colored tulips have different meanings: red for true love, purple for royalty, and white for forgiveness.</p>
      
      <h2>Creating Meaningful Arrangements</h2>
      <p>Combine flowers thoughtfully to create bouquets that tell a story or convey specific sentiments for special occasions.</p>
    `,
    author: "Sophia Williams",
    authorRole: "Floral Historian",
    date: "2024-02-20",
    readTime: "8 min read",
    category: "History",
    tags: ["symbolism", "history", "meaning"],
    image: "https://images.unsplash.com/photo-1519378058457-4c29a0a2efac?w=600",
    featured: false,
  },
  {
    id: 6,
    slug: "wedding-flower-trends",
    title: "2024 Wedding Flower Trends: What's In This Season",
    excerpt:
      "Discover the latest trends in wedding floral design for the upcoming season.",
    content: `
      <h2>Celebrating Love with Fresh Trends</h2>
      <p>Wedding florals set the tone for the entire celebration. This year, couples are embracing bold colors, sustainable choices, and unique floral installations.</p>
      
      <h2>1. Bold Color Palettes</h2>
      <p>Move over pastels! Rich jewel tones, dramatic dark florals, and unexpected color combinations are taking center stage.</p>
      
      <h2>2. Sustainable Weddings</h2>
      <p>Couples are choosing locally grown, seasonal flowers and arrangements that can be repurposed or donated after the wedding.</p>
      
      <h2>3. Floral Installations</h2>
      <p>From hanging floral chandeliers to living walls and floral arches, installations create wow-factor moments.</p>
      
      <h2>4. Dried Flower Accents</h2>
      <p>Dried flowers add texture and longevity to arrangements, often paired with fresh blooms for contrast.</p>
      
      <h2>5. Personal Touches</h2>
      <p>Custom monograms in flowers, meaningful blooms that tell the couple's story, and heirloom vases are becoming more popular.</p>
    `,
    author: "Jessica Taylor",
    authorRole: "Wedding Florist",
    date: "2024-02-15",
    readTime: "5 min read",
    category: "Weddings",
    tags: ["weddings", "trends", "2024"],
    image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=600",
    featured: true,
  },
];

export const categories = [
  { name: "All", count: 6 },
  { name: "Tutorials", count: 1 },
  { name: "Seasonal", count: 1 },
  { name: "Care Tips", count: 1 },
  { name: "Sustainability", count: 1 },
  { name: "History", count: 1 },
  { name: "Weddings", count: 1 },
];

export const tags = [
  "floral design",
  "beginners",
  "arrangement",
  "spring",
  "seasonal",
  "home decor",
  "flower care",
  "tips",
  "longevity",
  "sustainability",
  "eco-friendly",
  "industry",
  "symbolism",
  "history",
  "meaning",
  "weddings",
  "trends",
  "2024",
];

# Brav3 Market - Retro Electronics E-Commerce

Brav3 Market is a modern e-commerce platform for retro electronics, built with Next.js 13+ and Tailwind CSS. This project is created as a learning exercise to master modern web development technologies including React, Next.js, and Tailwind CSS.

> 🎓 **Learning Project**: This project is designed to help developers learn and practice modern web development technologies. It demonstrates best practices in React, Next.js, and Tailwind CSS implementation.

## 🌍 Live Demo

[Click here to visit Brav3 Market 🚀](https://brav3-market.vercel.app)

Explore the live version of the app deployed on Vercel. Browse retro consoles, music gear, and more!

## 🚀 Features

- 🎮 Retro gaming consoles and games
- 🎹 Vintage keyboards
- 🎵 Retro music equipment
- 🛍️ Campaign products
- 🔍 Advanced search and filtering
- 🛒 Cart management
- ⭐ Product reviews
- 💰 Discount system

## 🛠️ Technologies

- **Frontend Framework:** Next.js 13+
- **Styling:** Tailwind CSS
- **State Management:** React Hooks
- **API:** REST API
- **Database:** JSON Server
- **Development:** Node.js

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/brav3-market.git
cd brav3-market
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server and JSON server:
```bash
npm run all
```

This command will start both the Next.js development server and JSON server concurrently.

## 🏗️ Project Structure

```
brav3-market/
├── src/
│   ├── app/
│   │   ├── components/     # Reusable components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── api/           # API services
│   │   ├── campaign/      # Campaign page
│   │   ├── cart/          # Cart page
│   │   └── product/       # Product detail page
│   ├── data/             # JSON database
│   └── public/           # Static files
├── package.json
└── README.md
```

## 🔧 API Endpoints

### Products
- `GET /products` - List all products
- `GET /products/:id` - Get product details
- `PUT /products/:id` - Update product

### Campaigns
- `GET /campaigns` - List all campaigns
- `POST /campaigns` - Add new campaign

### Cart
- `GET /cart` - Get cart
- `POST /cart` - Add item to cart
- `PUT /cart/:id` - Update cart item
- `DELETE /cart/:id` - Remove item from cart

## 🎨 Theme and Design

The project uses a retro-futuristic theme:
- Primary color: Green (#00ff00)
- Background: Black (#000000)
- Font: VT323 and Pixelify (Retro terminal font)

## 🤝 Contributing
1. Fork it
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Contact

Gürsel Cesur - (gursel.cesur@ozu.edu.tr || @gursel_cesur)


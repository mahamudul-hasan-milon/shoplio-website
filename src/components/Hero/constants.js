import saleImg from "../../assets/hero/sale.png";
import shoppingImg from "../../assets/hero/shopping.png";
import womenImg from "../../assets/hero/women.png";

export const IMAGE_LIST = [
  {
    id: 1,
    img: saleImg,
    title: "Big Sale – Up to 70% OFF",
    subtitle: "Only This Week | Super Offer",
    description:
      "Limited time deal! Grab your favorite items with up to 70% discount before the week ends.",
    badge: "Limited Time",
    buttonText: "Explore Deals",
    features: ["Hot Discounts", "Best Offers", "Limited Stock"],
    discount: "70%",
    category: "Mega Sale",
  },
  {
    id: 2,
    img: shoppingImg,
    title: "Couple Shopping Deals",
    subtitle: "New Arrivals for Him & Her",
    description:
      "Upgrade your style together! Discover matching outfits, accessories and combo offers for couples.",
    badge: "Combo Offer",
    buttonText: "Shop Together",
    features: ["Couple Combos", "Exclusive Offers", "Fast Delivery"],
    discount: "50%",
    category: "Men & Women",
  },
  {
    id: 3,
    img: womenImg,
    title: "Women's Fashion Collection",
    subtitle: "Trendy Looks at Best Price",
    description:
      "Refresh your wardrobe with trendy dresses, tops, and accessories. Special discounts available now!",
    badge: "Trending Now",
    buttonText: "Shop Women",
    features: ["Premium Quality", "Easy Returns", "Secure Payment"],
    discount: "60%",
    category: "Women's Fashion",
  },
];

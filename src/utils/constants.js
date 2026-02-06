import { FaFacebook, FaInstagram } from "react-icons/fa";

import jacketImg from "../assets/products/jacket.avif";
import sweaterImg from "../assets/products/sweater.webp";
import watchImg from "../assets/products/watch.webp";
import shoesImg from "../assets/products/shoes.png";

export const PRODUCTS = [
  {
    id: 1,
    name: "Winter Jacket",
    price: 49.99,
    color: "Black",
    size: "M",
    category: "Men's Wear",
    img: jacketImg,
  },
  {
    id: 2,
    name: "Cashmere Sweater",
    price: 79.99,
    color: "Navy",
    size: "L",
    category: "Women's Wear",
    img: sweaterImg,
  },
  {
    id: 3,
    name: "Smart Watch",
    price: 199.99,
    color: "Space Gray",
    size: "One Size",
    category: "Electronics",
    img: watchImg,
  },
  {
    id: 4,
    name: "Running Shoes",
    price: 89.99,
    color: "White/Blue",
    size: "42",
    category: "Footwear",
    img: shoesImg,
  },
];

export const NAVIGATION_MENU = [
  { id: 1, name: "Home", href: "/" },
  { id: 2, name: "Top Rated", href: "/top-rated" },
  { id: 3, name: "Kids Wear", href: "/kids" },
  { id: 4, name: "Mens Wear", href: "/men" },
  { id: 5, name: "Electronics", href: "/electronics" },
];

export const DROPDOWN_LINKS = [
  { id: 1, name: "New Arrivals", href: "/new" },
  { id: 2, name: "Winter Collection", href: "/winter" },
  { id: 3, name: "Summer Collection", href: "/summer" },
  { id: 4, name: "Sale", href: "/sale" },
];

export const FOOTER_LINKS = [
  {
    title: "Shop",
    links: [
      { name: "New Arrivals", href: "/new" },
      { name: "Winter Collection", href: "/winter" },
      { name: "Summer Collection", href: "/summer" },
      { name: "Sale", href: "/sale" },
      { name: "Best Sellers", href: "/bestsellers" },
    ],
  },
  {
    title: "Company",
    links: [
      { name: "About Us", href: "/about" },
      { name: "Careers", href: "/careers" },
      { name: "Blog", href: "/blog" },
      { name: "Press", href: "/press" },
      { name: "Sustainability", href: "/sustainability" },
    ],
  },
];

export const SOCIAL_LINKS = [
  {
    name: "Facebook",
    href: "https://www.facebook.com/m.h.milon.212672",
    Icon: FaFacebook,
    hoverClass: "hover:text-blue-600",
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/mahamudulhasan_milon/",
    Icon: FaInstagram,
    hoverClass: "hover:text-pink-600",
  },
];

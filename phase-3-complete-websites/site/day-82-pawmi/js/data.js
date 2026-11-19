const IMG = {
  hero: "https://framerusercontent.com/images/EIIsrolSSqt3mpGd4lJgSay54Gc.png?height=1016&width=1250",
  about: "https://framerusercontent.com/images/TtzpMZaU5qCP1EGUeycy2syGA.png?height=1200&width=1050",
  mission: "https://framerusercontent.com/images/rYQ61duJN8Fd3TEmCnySWQ7mQUQ.png?height=300&width=258",
  vet: "https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?auto=format&fit=crop&w=1200&q=88",
  groom: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&w=1000&q=88",
  emergency: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=1000&q=88",
  nutrition: "https://images.unsplash.com/photo-1582798358481-d199fb7347bb?auto=format&fit=crop&w=1000&q=88",
  pets: "https://framerusercontent.com/images/EIIsrolSSqt3mpGd4lJgSay54Gc.png?width=1250&height=1016",
  product1: "https://framerusercontent.com/images/O15uV9m2doXYJRhH116wuMy278.png?height=486&width=406",
  product2: "https://framerusercontent.com/images/utEHLVDhzlfOsKVYygDltvVRU.png?height=498&width=580",
  product3: "https://framerusercontent.com/images/timvNFHGBg79Ra5paqej2xcuj0.png?height=498&width=580",
  product4: "https://images.unsplash.com/photo-1583337426008-2fef7c1c5b45?auto=format&fit=crop&w=700&q=88",
  team1: "https://framerusercontent.com/images/azJM9OWR5EvcK7IgGk0UNAEiJKk.png?height=788&width=686",
  team2: "https://framerusercontent.com/images/hkFubSjCLBvllIUvlgVPoffpiE.png?height=788&width=686",
  team3: "https://framerusercontent.com/images/lEWF75kbuFN30PdYVogusbuaPdk.png?height=788&width=686",
  team4: "https://framerusercontent.com/images/AKeL8rj5nTy4NF0VklaiQVyw0yk.png?height=1958&width=1500",
  blog1: "https://images.unsplash.com/photo-1544568100-847a948585b9?auto=format&fit=crop&w=900&q=88",
  blog2: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&w=900&q=88",
  blog3: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=900&q=88",
  gallery1: "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?auto=format&fit=crop&w=900&q=88",
  gallery2: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=900&q=88",
  gallery3: "https://framerusercontent.com/images/A14s4MRAekPpzPJatulF2nsYD4g.png?height=906&width=684",
  gallery4: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=900&q=88"
};

const services = [
  {title:"Vet checkups", desc:"Regular professional veterinary examinations to monitor your pet’s health, detect issues early, and support long-term wellness.", img:IMG.vet, icon:"✚"},
  {title:"Pet grooming", desc:"Gentle grooming that keeps coats clean, comfortable and healthy, with care tailored to every pet.", img:IMG.groom, icon:"✂"},
  {title:"Emergency support", desc:"Compassionate guidance and prompt care when your furry companion needs extra attention.", img:IMG.emergency, icon:"♥"},
  {title:"Pet vaccination", desc:"Stay on top of essential vaccinations and preventive care at every stage of life.", img:IMG.mission, icon:"✚"},
  {title:"Nutrition advice", desc:"Personalized nutrition guidance to help your pet thrive with balanced everyday meals.", img:IMG.nutrition, icon:"✿"}
];
const products = [
  {title:"Chicken bites",price:"$24.99",img:IMG.product1,tag:"Best seller"},
  {title:"Chew rope",price:"$30.99",img:IMG.product2,tag:"Playtime"},
  {title:"Pet Toy Set",price:"$80.99",img:IMG.product3,tag:"Popular"},
  {title:"Natural cat food",price:"$50.99",img:IMG.product4,tag:"Nutrition"}
];
const team = [
  {name:"Dr. Olivia Carter",role:"Senior Veterinarian",img:IMG.team1},
  {name:"Dr. Emma Brooks",role:"Lead Veterinarian",img:IMG.team2},
  {name:"Dr. Ava Collins",role:"Emergency Veterinarian",img:IMG.team3},
  {name:"Dr. Lily Cooper",role:"Chief Veterinarian",img:IMG.team4}
];
const posts = [
  {title:"Best healthy foods for active family pets",date:"May 18, 2026",author:"Olivia Carter",img:IMG.blog1},
  {title:"Simple grooming tips for happy indoor pets",date:"May 12, 2026",author:"Emma Brooks",img:IMG.blog2},
  {title:"How regular vet visits improve pet health",date:"May 04, 2026",author:"Ava Collins",img:IMG.blog3}
];

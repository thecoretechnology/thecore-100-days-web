const cdn = 'https://cdn.prod.website-files.com/670f7de6dec5c0c82ae616bd/';
const site = 'https://cdn.prod.website-files.com/670f7de6dec5c0c82ae616e4/';

// Original Jewelleryz Webflow CDN assets, mapped from the live reference page.
export const referenceAssets = {
  hero: [
    site + '6712c38ec387c4c0f22f2f20_diego-rosa-sdvQNREaNC8-unsplash.jpg',
    site + '6712c38f0797b645d00da239_370.jpg',
    site + '6712c38e0797b645d00da186_10276.jpg'
  ],
  story: site + '6713be34be0e2345e320eeb2_5040.jpg',
  offer: site + '6719115eeba29e20412432f6_star.avif',
  collections: [
    site + '67140fac4224d988f198c6ac_5043.jpg',
    site + '671409aed93a969d690312f8_pexels-kagiso-mokalake-34808293-7093174.jpg',
    site + '67140f4abff236c60cd28c03_eileen-pan-RQ50g39mh2o-unsplash.jpg'
  ],
  before: site + '6714137cf367de40be66b295_prahant-photography-SdXnwxRE8pA-unsplash.jpg',
  after: site + '6714137cd76cda920887d62b_prahant-photography-j9j9r1NCXLM-unsplash.jpg',
  blog: [
    cdn + '67153a7e268db1bfd39f5e26_2151695044.avif',
    cdn + '67153c3d78a3dccbefed0a48_67153ad25eccfd677f23d3fc_esther-tuttle-0U-dXovBS2E-unsplash.avif',
    cdn + '670f7de6dec5c0c82ae6193b_13418.avif',
    cdn + '67153ae8c726bc817d107c41_1066.avif'
  ],
  clientLogos: [
    site + '670f7de6dec5c0c82ae617fd_customers_7.svg',
    site + '670f7de6dec5c0c82ae617fc_customers_6.svg',
    site + '670f7de6dec5c0c82ae617fb_customers_2.svg',
    site + '670f7de6dec5c0c82ae61802_bronx.svg',
    site + '670f7de6dec5c0c82ae617fa_customers_8.svg'
  ],
  about: [
    site + '6713bda8a8565c5d932f5da1_8120.jpg',
    site + '67142694488d938173269230_star%20%285%29.avif',
    site + '6714266a39d135faa5e0cec6_rocket%20%282%29.avif',
    site + '67142682cde83993027afd80_professional-services%20%281%29.avif'
  ],
  team: [
    'https://cdn.prod.website-files.com/66010b96fb3d1aa19847819d/661cf3200c64a1085520182e_wepik-export-20230907092603swid%201.webp',
    site + '670f7de6dec5c0c82ae617b6_wepik-export-20240417191847Mfdx%20%281%29.webp',
    site + '670f7de6dec5c0c82ae6175f_wepik-export-20230912063007F2fv%201.webp',
    site + '671421fefdea83edadfd808b_15187.jpg'
  ],
  testimonials: [
    site + '6714f8754d1abab1b3e208f3_7091.avif',
    site + '67152b408cd33c5e6e04b508_2147989567.jpg',
    site + '670f7de6dec5c0c82ae6196e_15187.jpg',
    site + '670f7de6dec5c0c82ae61953_vinicius-wiesehofer-UOavP_Z38lE-unsplash.jpg',
    site + '67152affe716bcdd2fd34b50_2148493050.jpg'
  ],
  footerGallery: [
    site + '6714119ab8ff19aa6832025e_esther-tuttle-0U-dXovBS2E-unsplash.jpg',
    site + '671410e7a5b3f6417b48afeb_2151695044.jpg',
    site + '671410d19ba04f04d7257fe9_2151695004.jpg',
    site + '67140f6ab8ff19aa6830518d_17957.jpg',
    site + '67140f6a87fbaf9a32f8c528_2149509252.jpg',
    site + '6714198b22ccd9c2f9b747d7_morgan-alley-kXA0kGuc5U8-unsplash.jpg',
    site + '67140f9122ccd9c2f9b0b797_2151695047.jpg'
  ],
  benefits: [
    site + '67140cbc0aa4ddf068499bbd_delivery-truck.avif',
    site + '67140d93abd0ae7169596fe5_customer-care.avif',
    site + '67140d407774278f26dea730_verified.avif',
    site + '67140dc98a096018dd5494f0_credit-card%20%281%29.png'
  ]
};

export const categories = [
  {name:'Rings',slug:'rings',image:cdn+'6711030f84eb63fc14608f8f_vecteezy_unlocking-the-beauty-of-rings-a-guide-to-styles-and-meanings_45828080.avif'},
  {name:'Ear Rings',slug:'ear-rings',image:cdn+'67180c45a368e6adb56123f5_pngegg%20%2815%29.png'},
  {name:'Necklace',slug:'necklace',image:cdn+'6718112ce2311f76fb921d69_vecteezy_ai-generated-berliant-necklace-isolated-on-transparent_35242052.avif'},
  {name:'Bracelets',slug:'bracelets',image:cdn+'67181372e1aa339ad3c8cf59_pngwing.com.avif'}
];

export const products = [
  {id:'golden-dusk',name:'Golden Dusk',category:'ear-rings',price:2000,oldPrice:2300,sku:'NX-391DR-7',image:cdn+'67180fddda747d655a46d383_ipser2007039p.avif',alt:'Golden Dusk jewellery product from Jewelleryz',hoverImage:cdn+'67180cf2a83659fc1a0483a7_2149649172.avif',karat:'18K',weight:'0.3 g',color:'White Gold',featured:true},
  {id:'radiant-pearl',name:'Radiant Pearl',category:'ear-rings',price:2000,oldPrice:2300,sku:'NX-391DR-7',image:cdn+'67180c6e30eedb3cec135faa_8120.avif',alt:'Radiant Pearl jewellery product from Jewelleryz',hoverImage:cdn+'67180cf7f8140189debfb3ad_5043.avif',karat:'18K',weight:'0.3 g',color:'White Gold'},
  {id:'twilight-charm-bracelet',name:'Twilight Charm Bracelet',category:'bracelets',price:2000,oldPrice:3250,sku:'NX-391DR-7',image:cdn+'671813fa68e5058d175e192e_pngwing.com%20%283%29.avif',alt:'Twilight Charm Bracelet from Jewelleryz',hoverImage:cdn+'6718138c6af5eaefa634844b_2151695004.avif',karat:'18K',weight:'6.3 g',color:'Yellow Gold'},
  {id:'opal-gleam-bangle',name:'Opal Gleam Bangle',category:'bracelets',price:2000,oldPrice:3250,sku:'NX-391DR-7',image:cdn+'67181372e1aa339ad3c8cf59_pngwing.com.avif',alt:'Opal Gleam Bangle from Jewelleryz',hoverImage:cdn+'67181386b2eea951358e9739_24485.avif',karat:'18K',weight:'7.0 g',color:'Rose Gold'},
  {id:'serenity-chain',name:'Serenity Chain',category:'necklace',price:2000,oldPrice:3250,sku:'NX-391DR-7',image:cdn+'6718112ce2311f76fb921d69_vecteezy_ai-generated-berliant-necklace-isolated-on-transparent_35242052.avif',alt:'Serenity Chain from Jewelleryz',hoverImage:cdn+'6718116cebb7e97593017ade_pexels-nxtclick02-19646999.avif',karat:'18K',weight:'3.8 g',color:'Yellow Gold'},
  {id:'eternal-grace-pendant',name:'Eternal Grace Pendant',category:'necklace',price:2000,oldPrice:2250,sku:'NX-391DR-7',image:cdn+'67181061802a6ff9936576f6_vecteezy_necklace-with-blue-stones_48759474.avif',alt:'Eternal Grace Pendant from Jewelleryz',hoverImage:cdn+'671810862ef36e2b91cdd562_2151695044.jpg',karat:'18K',weight:'3.4 g',color:'Yellow Gold'},
  {id:'luna-sparkle-hoops',name:'Luna Sparkle Hoops',category:'ear-rings',price:3250,oldPrice:null,sku:'NX-391DR-7',image:cdn+'67180c45a368e6adb56123f5_pngegg%20%2815%29.png',alt:'Luna Sparkle Hoops from Jewelleryz',karat:'18K',weight:'4.1 g',color:'Yellow Gold'},
  {id:'luxary-radiance',name:'Luxary Radiance',category:'rings',price:4200,oldPrice:null,sku:'NX-391DR-7',image:cdn+'67110493369974c4054aba24_pngegg%20%288%29.avif',alt:'Luxary Radiance ring from Jewelleryz',karat:'18K',weight:'5.6 g',color:'White Gold'},
  {id:'celestial-drop-earrings',name:'Celestial Drop Earrings',category:'ear-rings',price:1500,oldPrice:2000,sku:'NX-391DR-7',image:cdn+'67180e43ebb7e97593fec265_e511p.avif',alt:'Celestial Drop Earrings from Jewelleryz',karat:'18K',weight:'3.1 g',color:'Yellow Gold'},
  {id:'celestial-radiance-oval',name:'Celestial Radiance Oval',category:'rings',price:3999,oldPrice:4500,sku:'NX-391DR-7',image:cdn+'6711030f84eb63fc14608f8f_vecteezy_unlocking-the-beauty-of-rings-a-guide-to-styles-and-meanings_45828080.avif',alt:'Celestial Radiance Oval ring from Jewelleryz',hoverImage:cdn+'6719079fc0ce5955fb1da7e1_2149509272.avif',karat:'18K',weight:'4.8 g',color:'White Gold'},
  {id:'aurora-sparkle-cushion-cut',name:'Aurora Sparkle Cushion Cut',category:'rings',price:4250,oldPrice:null,sku:'NX-391DR-7',image:cdn+'67110390dd75ef1ea04ef8cf_pngegg%20%2814%29.avif',alt:'Aurora Sparkle Cushion Cut ring',karat:'18K',weight:'4.8 g',color:'White Gold'},
  {id:'dreamy-horizon-pear',name:'Dreamy Horizon Pear',category:'rings',price:3200,oldPrice:null,sku:'NX-391DR-7',image:cdn+'671104635fed5c613096cc84_pngegg%20%2811%29.avif',alt:'Dreamy Horizon Pear ring',karat:'18K',weight:'4.4 g',color:'White Gold'},
  {id:'enchanted-glimmer',name:'Enchanted Glimmer',category:'rings',price:5100,oldPrice:5500,sku:'NX-391DR-7',image:cdn+'67110522ab0a0289b4b5e42b_pngegg%20%284%29.avif',alt:'Enchanted Glimmer ring',karat:'18K',weight:'5.2 g',color:'White Gold'},
  {id:'eternal-grace-solitaire',name:'Eternal Grace Solitaire',category:'rings',price:4250,oldPrice:null,sku:'NX-391DR-7',image:cdn+'6710f76121f3567e28ec80e5_pngegg%20%281%29.avif',alt:'Eternal Grace Solitaire ring',karat:'18K',weight:'4.5 g',color:'White Gold'},
  {id:'infinity-twist-stone',name:'Infinity Twist Stone',category:'rings',price:5600,oldPrice:null,sku:'NX-391DR-7',image:cdn+'671102e699b5801f2f4090f4_pngegg%20%285%29.avif',alt:'Infinity Twist Stone ring',karat:'18K',weight:'5.6 g',color:'White Gold'},
  {id:'radiant-star-halo-ring',name:'Radiant Star Halo Ring',category:'rings',price:3500,oldPrice:null,sku:'NX-391DR-7',image:cdn+'671102b984eb63fc146046f5_pngegg%20%286%29.avif',alt:'Radiant Star Halo Ring',karat:'18K',weight:'4.1 g',color:'White Gold'},
  {id:'regal-bloom-cluster',name:'Regal Bloom Cluster',category:'rings',price:2800,oldPrice:null,sku:'NX-391DR-7',image:cdn+'671104cc6c58ef2c24e0fef2_pngegg%20%2813%29.avif',alt:'Regal Bloom Cluster ring',karat:'18K',weight:'3.8 g',color:'White Gold'},
  {id:'timeless-elegance-vintage',name:'Timeless Elegance Vintage',category:'rings',price:7000,oldPrice:8500,sku:'NX-391DR-7',image:cdn+'6711034bafdb8706e5dbb8c7_pngegg%20%287%29.avif',alt:'Timeless Elegance Vintage ring',karat:'18K',weight:'6.2 g',color:'White Gold'}
];

export const blogs = [
 {id:'jewelry-trends-to-elevate-your-style',category:'Diamond',date:'January 12, 2024',title:'Jewelry Trends to Elevate Your Style',image:referenceAssets.blog[0],body:'Jewelry is more than just an accessory; it is a statement of style, emotion and personal expression. Explore thoughtful styling, timeless pieces and the details that make jewellery feel personal.'},
 {id:'choosing-the-perfect-engagement-ring',category:'Jewellery',date:'January 12, 2024',title:'Choosing the Perfect Engagement Ring',image:referenceAssets.blog[1],body:'A ring is a symbol of a story only you can tell. Explore setting, proportion, stone shape and the details that make a meaningful choice.'},
 {id:'why-sustainable-jewelry-matters',category:'Jewellery',date:'November 6, 2023',title:'Why Sustainable Jewelry Matters',image:referenceAssets.blog[2],body:'Explore thoughtful choices, enduring materials and the value of choosing jewellery designed to be treasured.'},
 {id:'how-to-make-your-jewelry-stand-out',category:'Diamond',date:'October 20, 2024',title:'How to Make Your Jewelry Stand Out',image:referenceAssets.blog[3],body:'Discover ways to make each piece feel personal through considered styling, shape and detail.'},
 {id:'jewelry-styling-day-to-night',category:'Rings',date:'November 6, 2023',title:'Jewelry Styling: Day to Night',image:referenceAssets.collections[2],body:'A considered jewellery edit can move effortlessly from daytime simplicity to evening elegance.'},
 {id:'timeless-jewelry-for-milestones',category:'Wedding',date:'November 6, 2023',title:'Timeless Jewelry for Milestones',image:referenceAssets.collections[0],body:'Celebrate meaningful moments with jewellery chosen for lasting memories and personal significance.'}
];

export const money = n => new Intl.NumberFormat('en-US',{style:'currency',currency:'USD',maximumFractionDigits:2}).format(n);

import { assetPath } from '../assetPath.js';

export const disciplines = [
  { id:'ceramics', number:'01', name:'Ceramics', count:'3 classes', intro:'Wheel, hand-building and glazing in a studio with six wheels and two kilns. Start with a taster, stay for the firing.', image:assetPath('images/ceramics-vase-editorial.jpg'), featureImage:assetPath('images/ceramics-wheel.jpg'), tone:'olive', object:'Ash-glazed bottle vase · made in Wheel Throwing II' },
  { id:'printmaking', number:'02', name:'Printmaking', count:'3 classes', intro:'Linocut, screen printing and risograph on presses you can book once you have done your first class.', image:assetPath('images/printmaking-botanical-print.jpg'), featureImage:assetPath('images/printmaking-carving.jpg'), tone:'dark', object:'Two-colour linocut, edition of 12 · made in Introduction to Linocut' },
  { id:'textiles', number:'03', name:'Textiles', count:'3 classes', intro:'Weaving, natural dyeing and embroidery, with plant-dyed yarn from our own dye garden.', image:assetPath('images/textiles-indigo-folded.jpg'), featureImage:assetPath('images/textiles-loom-weaving.jpg'), tone:'stone', object:'Indigo shibori cloths · made in Natural Dyeing' },
  { id:'jewellery', number:'04', name:'Jewellery', count:'3 classes', intro:'Ring making, stone setting and casting at fully equipped benches, from your very first silver band.', image:assetPath('images/jewellery-rings-detail.jpg'), featureImage:assetPath('images/jewellery-hammering.jpg'), tone:'rust', object:'Stacking rings in silver and brass · made in Silver Ring Making' }
];

export const classes = [
  { slug:'wheel-throwing-i', title:'Wheel Throwing I', type:'Ceramics', duration:'3 hours', price:'£95', date:'Nov 14', image:assetPath('images/ceramics-wheel.jpg'), detailImage:assetPath('images/ceramics-vase-editorial.jpg') },
  { slug:'wheel-throwing-ii', title:'Wheel Throwing II', type:'Ceramics', duration:'Six weeks', price:'£320', date:'Nov 19', image:assetPath('images/ceramics-vase-editorial.jpg'), detailImage:assetPath('images/ceramics-wheel.jpg') },
  { slug:'mugs-on-the-wheel', title:'Mugs on the Wheel', type:'Ceramics', duration:'Four weeks', price:'£240', date:'Dec 03', image:assetPath('images/hero-vase.png'), detailImage:assetPath('images/ceramics-wheel.jpg') },
  { slug:'introduction-to-linocut', title:'Introduction to Linocut', type:'Printmaking', duration:'3 hours', price:'£85', date:'Nov 16', image:assetPath('images/printmaking-carving.jpg'), detailImage:assetPath('images/printmaking-botanical-print.jpg') },
  { slug:'screen-printing-i', title:'Screen Printing I', type:'Printmaking', duration:'Six weeks', price:'£340', date:'Nov 11', image:assetPath('images/studio-interior-makers.jpg'), detailImage:assetPath('images/printmaking-carving.jpg') },
  { slug:'botanical-lino-prints', title:'Botanical Lino Prints', type:'Printmaking', duration:'3 hours', price:'£90', date:'Dec 05', image:assetPath('images/printmaking-botanical-print.jpg'), detailImage:assetPath('images/printmaking-carving.jpg') },
  { slug:'natural-dyeing', title:'Natural Dyeing', type:'Textiles', duration:'Six weeks', price:'£320', date:'Nov 13', image:assetPath('images/textiles-indigo-folded.jpg'), detailImage:assetPath('images/textiles-loom-weaving.jpg') },
  { slug:'indigo-shibori', title:'Indigo Shibori', type:'Textiles', duration:'3 hours', price:'£90', date:'Nov 17', image:assetPath('images/textiles.jpg'), detailImage:assetPath('images/textiles-indigo-folded.jpg') },
  { slug:'frame-loom-weaving', title:'Frame Loom Weaving', type:'Textiles', duration:'3 hours', price:'£85', date:'Nov 26', image:assetPath('images/textiles-loom-weaving.jpg'), detailImage:assetPath('images/textiles-indigo-folded.jpg') },
  { slug:'silver-ring-making', title:'Silver Ring Making', type:'Jewellery', duration:'3 hours', price:'£110', date:'Nov 15', image:assetPath('images/jewellery-hammering.jpg'), detailImage:assetPath('images/jewellery-rings-detail.jpg') },
  { slug:'stone-setting', title:'Stone Setting', type:'Jewellery', duration:'4 hours', price:'£120', date:'Nov 23', image:assetPath('images/jewellery-rings-detail.jpg'), detailImage:assetPath('images/jewellery-hammering.jpg') },
  { slug:'hammered-stacking-rings', title:'Hammered Stacking Rings', type:'Jewellery', duration:'4 hours', price:'£120', date:'Dec 06', image:assetPath('images/jewellery.jpg'), detailImage:assetPath('images/jewellery-hammering.jpg') }
];

export const faqs = [
  ['How do I book a class?','Pick a date on any class page and send a request. We reply by email within one working day, and your place is confirmed once we hear back.'],
  ['Can I cancel or move my booking?','You can move your place to another date up to 72 hours before your class. Contact the studio and we will help you find another session.'],
  ['Do I need any experience?','No. Most classes are designed for beginners, and your tutor will guide you through the tools and techniques step by step.'],
  ['What should I wear?','Wear comfortable clothes you can move in and do not mind marking. Aprons and the tools you need are provided.'],
  ['Is there an age limit?','Age guidance can vary by class. Please contact the studio before booking if you are checking whether a particular session is suitable.'],
  ['How does membership work?','Membership gives returning makers more regular access to the studio. Some spaces and equipment require a completed introductory class and an induction.'],
  ['Do you sell gift cards?','Yes. Gift cards can be used towards classes and studio experiences. The recipient can choose the session that suits them.']
];

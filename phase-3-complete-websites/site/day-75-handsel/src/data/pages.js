import { assetPath } from '../assetPath.js';

export const articles = [
 {slug:'what-happens-to-your-pot-after-you-leave',title:'What happens to your pot after you leave',category:'Techniques',date:'October 8, 2026',image:assetPath('images/ceramics-vase-editorial.jpg'),detailImage:assetPath('images/ceramics-wheel.jpg'),excerpt:'Your pot is not finished when the class ends. Here is the three-week journey from wet clay to a glazed piece you can eat from.'},
 {slug:'how-to-make-a-ring-that-actually-fits',title:'How to make a ring that actually fits',category:'Techniques',date:'October 15, 2026',image:assetPath('images/jewellery-rings-detail.jpg'),detailImage:assetPath('images/jewellery-hammering.jpg'),excerpt:'Fingers swell in summer, shrink in the cold and are rarely the same size on both hands. Peter’s guide to sizing a ring you will want to wear every day.'},
 {slug:'open-evenings-are-back-for-autumn',title:'Open evenings are back for autumn',category:'Events',date:'October 1, 2026',image:assetPath('images/studio-interior-makers.jpg'),detailImage:assetPath('images/ceramics-wheel.jpg'),excerpt:'From October, the studio stays open late on Thursdays. Come and use the benches, meet the tutors and see what everyone is making.'},
 {slug:'five-things-before-your-first-linocut',title:'Five things to know before your first linocut',category:'Techniques',date:'September 24, 2026',image:assetPath('images/printmaking-carving.jpg'),detailImage:assetPath('images/printmaking-botanical-print.jpg'),excerpt:'Carving in reverse, sharp tools and the joy of the first pull. A few notes to help your first print go smoothly.'},
 {slug:'a-year-in-the-dye-garden',title:'A year in the dye garden',category:'Studio notes',date:'September 10, 2026',image:assetPath('images/textiles-indigo-folded.jpg'),detailImage:assetPath('images/textiles-loom-weaving.jpg'),excerpt:'Weld, madder and woad grow in the yard behind the textile room. This is how a handful of plants gives us a whole season of colour.'},
 {slug:'forty-years-at-the-bench',title:'Forty years at the bench',category:'Makers',date:'August 27, 2026',image:assetPath('images/jewellery-hammering.jpg'),detailImage:assetPath('images/jewellery-rings-detail.jpg'),excerpt:'Peter Lund made his first ring in 1986 and has taught at Handsel since the start. We asked him what has changed, and what never does.'},
 {slug:'how-to-choose-your-first-class',title:'How to choose your first class',category:'Studio notes',date:'August 13, 2026',image:assetPath('images/ceramics-wheel.jpg'),detailImage:assetPath('images/studio-interior-makers.jpg'),excerpt:'Clay, ink, yarn or silver? A short guide to picking the craft that fits how you like to spend an afternoon.'}
];

export const tutors = [
 {name:'Mara Ellison',craft:'Ceramics',role:'Head of ceramics',bio:'Mara works with wheel-thrown forms and quiet, tactile glazes. Her classes make room for experimentation, repetition and finding your own rhythm.',image:assetPath('images/ceramics-wheel.jpg')},
 {name:'Tomas Reyes',craft:'Printmaking',role:'Printmaker',bio:'Tomas is drawn to the bold marks and happy accidents of print. He teaches linocut and screen printing with a generous, process-first approach.',image:assetPath('images/printmaking-carving.jpg')},
 {name:'Ada Okafor',craft:'Textiles',role:'Dyer and weaver',bio:'Ada explores natural colour, woven structure and slow stitch. Her teaching starts with curiosity about materials and the stories they can hold.',image:assetPath('images/textiles-loom-weaving.jpg')},
 {name:'Peter Lund',craft:'Jewellery',role:'Silversmith',bio:'Peter makes small-batch silver and brass pieces, and loves helping new makers discover the confidence that comes from working with metal.',image:assetPath('images/jewellery-hammering.jpg')}
];

export const scheduleDates = [
 {day:'11',month:'NOV',weekday:'Wednesday',time:'06:30 PM',classSlug:'screen-printing-i',seats:'A few places left',status:'limited',price:'£340'},
 {day:'13',month:'NOV',weekday:'Friday',time:'06:00 PM',classSlug:'natural-dyeing',seats:'Open',status:'open',price:'£320'},
 {day:'14',month:'NOV',weekday:'Saturday',time:'10:00 AM',classSlug:'wheel-throwing-i',seats:'A few places left',status:'limited',price:'£95'},
 {day:'15',month:'NOV',weekday:'Sunday',time:'05:00 PM',classSlug:'silver-ring-making',seats:'Sold out',status:'sold-out',price:'£110'},
 {day:'16',month:'NOV',weekday:'Monday',time:'06:30 PM',classSlug:'introduction-to-linocut',seats:'Open',status:'open',price:'£85'},
 {day:'17',month:'NOV',weekday:'Tuesday',time:'03:00 PM',classSlug:'indigo-shibori',seats:'Open',status:'open',price:'£90'},
 {day:'19',month:'NOV',weekday:'Thursday',time:'06:00 PM',classSlug:'wheel-throwing-ii',seats:'Open',status:'open',price:'£320'},
 {day:'22',month:'NOV',weekday:'Sunday',time:'05:00 PM',classSlug:'silver-ring-making',seats:'A few places left',status:'limited',price:'£110'},
 {day:'23',month:'NOV',weekday:'Monday',time:'11:00 AM',classSlug:'stone-setting',seats:'Open',status:'open',price:'£120'},
 {day:'26',month:'NOV',weekday:'Thursday',time:'06:00 PM',classSlug:'frame-loom-weaving',seats:'Open',status:'open',price:'£85'},
 {day:'28',month:'NOV',weekday:'Saturday',time:'10:00 AM',classSlug:'wheel-throwing-i',seats:'Open',status:'open',price:'£95'},
 {day:'30',month:'NOV',weekday:'Monday',time:'02:00 PM',classSlug:'introduction-to-linocut',seats:'Sold out',status:'sold-out',price:'£85'},
 {day:'01',month:'DEC',weekday:'Tuesday',time:'03:00 PM',classSlug:'indigo-shibori',seats:'Waitlist open',status:'waitlist',price:'£90'},
 {day:'03',month:'DEC',weekday:'Thursday',time:'06:00 PM',classSlug:'mugs-on-the-wheel',seats:'Open',status:'open',price:'£240'},
 {day:'05',month:'DEC',weekday:'Saturday',time:'06:00 PM',classSlug:'botanical-lino-prints',seats:'Open',status:'open',price:'£90'},
 {day:'06',month:'DEC',weekday:'Sunday',time:'06:00 PM',classSlug:'hammered-stacking-rings',seats:'A few places left',status:'limited',price:'£120'}
];

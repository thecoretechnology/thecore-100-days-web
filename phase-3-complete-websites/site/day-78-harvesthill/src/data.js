import {assetPath} from './assetPath';
export const photos={hero:assetPath('images/hero-fields.jpg'),aerial:assetPath('images/why-aerial.jpg'),farmer:assetPath('images/sustainability-farmer.jpg'),seedlings:assetPath('images/seedling.jpg'),produce:assetPath('images/market-produce.jpg'),farmer2:assetPath('images/farmer-basket.jpg'),innovation:assetPath('images/innovation.jpg'),soil:assetPath('images/seedling.jpg'),fieldRows:assetPath('images/hero-fields.jpg'),crops:assetPath('images/why-aerial.jpg'),irrigation:assetPath('images/sustainability-farmer.jpg'),tractor:assetPath('images/hero-fields.jpg'),greenhouse:assetPath('images/seedling.jpg'),harvest:assetPath('images/market-produce.jpg'),farmerPortrait:assetPath('images/farmer-basket.jpg'),grain:assetPath('images/market-produce.jpg')};
export const solutions=[
{n:'01',title:'Precision farming',desc:'We use data-driven insights and smart technology to help farmers monitor soil health, optimize inputs and make more confident field decisions.',image:photos.innovation,tag:'Smarter decisions'},
{n:'02',title:'Sustainable irrigation',desc:'Our advanced irrigation systems reduce water waste and support efficient crop hydration, even through changing seasons.',image:photos.farmer,tag:'Every drop matters'},
{n:'03',title:'Supply chain support',desc:'Smarter post-harvest logistics and digital tracking systems help keep produce fresher and moving reliably from field to market.',image:photos.produce,tag:'From field to market'},
{n:'04',title:'Climate-resilient program',desc:'Our team works closely with clients to implement scalable strategies that improve resilience and long-term productivity.',image:photos.aerial,tag:'Built for tomorrow'},
{n:'05',title:'Technology integration',desc:'We bring useful technology into the heart of agriculture, making operations smarter, faster and more resilient from field to market.',image:photos.hero,tag:'Connected agriculture'},
{n:'06',title:'Organic practices',desc:'Our organic practices prioritize soil vitality, natural inputs and ecological harmony to produce high-quality crops responsibly.',image:photos.seedlings,tag:'Healthy by nature'}
];
export const plans=[
{name:'Starter Plan',price:'$499',desc:'Perfect for small to mid-size farms getting started with smart farming tools.',features:['Access to digital farm platform','Essential soil & crop tools','Monthly agronomist session','Basic reporting & yield forecasts'],featured:false},
{name:'Growth Plan',price:'$1,199',desc:'Ideal for farms ready to scale up operations and efficiency.',features:['Precision farming tools','Smart irrigation design & setup','Bi-weekly advisory check-ins','Post-harvest optimization support'],featured:true},
{name:'Enterprise Plan',price:'$2,499',desc:'For large agribusinesses needing full system integration and support.',features:['Unlimited farm size & locations','AI crop health analysis','24/7 expert support','Custom agri-digital dashboards'],featured:false}
];

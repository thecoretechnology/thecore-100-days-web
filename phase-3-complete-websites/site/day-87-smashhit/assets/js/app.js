const BASE = "/thecore-100-days-web/phase-3-complete-websites/site/day-87-smashhit/";
const A = `${BASE}assets/`;

const articles = [
  {
    slug: "train-like-a-professional-tennis-player", category: "Coaching", title: "Train like a professional tennis player", date: "Jan 5, 2025", image: "blog-rackets.jpg",
    excerpt: "Unlock the secrets to training like the pros! This post dives into the techniques, routines, and ...",
    lead: "Train Like a Tennis Champion",
    intro: "What separates professional tennis players from recreational players? It's not just talent or access to elite coaching—it’s their approach to training. Professionals focus on developing every aspect of their game, from physical conditioning and technical precision to mental resilience. By adopting their methods, you can significantly elevate your own performance on the court.",
    sections: [
      ["Build a Strong Fitness Base", "Physical fitness is the cornerstone of a professional tennis player’s training. Their rigorous routines go beyond basic gym workouts and are tailored to meet the unique demands of the sport. Tennis requires quick sprints, sudden directional changes, and sustained endurance during long matches. To build the necessary stamina, focus on cardiovascular training like running or cycling, combined with interval sprints to mimic the short bursts of energy needed during games."],
      ["Refine Your Technique with Purpose", "Technical skills are at the heart of a professional’s game. Every stroke, serve, and volley is executed with precision, and this level of mastery comes from hours of intentional practice. Instead of casually hitting balls, focus on improving specific elements of your technique. Break your strokes down into smaller movements, analyzing the angle of your racket, the placement of your feet, and the timing of your swing."],
      ["Develop a Champion’s Mindset", "Tennis is as much a mental battle as it is a physical one. Professional players understand that their mindset can make or break a match. Training your mind to stay focused and resilient is essential if you want to compete at a higher level. Visualization is a powerful tool used by many pros. Spend time imagining yourself playing the perfect game—executing flawless serves, nailing tough volleys, and keeping your composure under pressure."]
    ], quote: "Tennis is mostly mental. You win or lose the match before you even go out there.",
    close: "Training like a professional tennis player involves more than just practicing your swing. It’s about cultivating a holistic approach to your game—building physical strength, mastering technical skills, and honing mental resilience. By committing to this comprehensive method, you can unlock your full potential and transform your performance."
  },
  {
    slug: "ball-trace-putting-your-own-stamp-on-your-tennis-balls", category: "Fun and Games", title: "Putting your own stamp on your tennis balls", date: "Dec 29, 2024", image: "blog-player-2.jpg",
    excerpt: "Make your mark—literally! Explore the rising trend of customizing tennis balls with unique markings for ...", lead: "How to Personalize Your Gear",
    intro: "Tennis is a sport of precision, passion, and individuality. While players often focus on improving their strokes or upgrading their rackets, there’s another way to make your mark—literally. Personalizing your tennis balls has become a growing trend among enthusiasts and professionals alike.",
    sections: [["Why Personalize Your Tennis Balls?", "Adding a custom touch to your tennis balls is practical and stylish. It eliminates confusion during games or practice, especially when others bring similar balls to the court. Beyond practicality, it’s a way to express your unique style and passion for the sport."],["How to Make Your Mark", "The easiest way to customize your tennis balls is by using a stamping kit or permanent markers to add your initials or a unique symbol. For a more polished look, you can even order professionally printed tennis balls that feature your chosen designs."],["Own Your Style on the Court", "Personalizing your tennis balls is more than just a creative project—it’s a way to enhance your connection to the sport. These custom designs become part of your tennis identity, reminding you of your goals and dedication every time you pick up a ball."]],
    quote: "Tennis is mostly mental. You win or lose the match before you even go out there.", close: "Customizing your tennis balls is a small step that adds a big dose of personality and practicality to your game. Take a moment to put your own stamp on your gear, and let every match reflect your unique style and passion for tennis."
  },
  {
    slug: "revealed-radical-auxetic-tennis-racket", category: "News", title: "Revealed radical auxetic tennis racket", date: "Dec 1, 2024", image: "blog-racket.jpg",
    excerpt: "Discover the groundbreaking technology behind the radical auxetic tennis racket. This ...", lead: "Auxetic Racket Revolutionizing the Game",
    intro: "Tennis technology has always played a key role in shaping how the game is played, and the latest innovation is here to change the way players experience their rackets. The newly revealed radical auxetic tennis racket brings cutting-edge engineering to the court, promising unparalleled performance, precision, and feel.",
    sections: [["What Is Auxetic Technology?", "At the heart of this revolutionary racket lies auxetic technology, a breakthrough in material science. Auxetic structures are unique because they expand when stretched, unlike traditional materials that contract under tension. This innovative design allows the racket frame to dynamically respond to the impact of the ball."],["How It Enhances Performance", "The radical auxetic racket doesn’t just look futuristic; it plays that way too. Its ability to adapt to different levels of force ensures a consistent response across the string bed, minimizing dead spots and maximizing power on off-center hits."],["A Game-Changer for All Levels", "What sets the auxetic racket apart is its versatility. It caters to a wide range of playing styles, from aggressive baseliners to finesse-focused net players. The technology provides the perfect balance between power and control."]],
    quote: "Technology should enhance the player’s natural ability, not overpower it.", close: "The radical auxetic tennis racket is more than just an upgrade—it’s a glimpse into the future of tennis. By combining advanced materials with player-focused design, this racket is setting a new standard for performance and innovation."
  },
  {
    slug: "the-health-benefits-of-playing-tennis", category: "Coaching", title: "The health benefits of playing tennis", date: "Nov 21, 2024", image: "blog-health.jpg",
    excerpt: "What happens when the thrill of tennis meets the excitement of gambling? Learn about ...", lead: "Transformative Power of Tennis",
    intro: "Tennis is an incredible sport that blends physical activity, mental focus, and social interaction into one engaging experience. Whether you're playing casually with friends or training competitively, tennis has the power to transform your well-being in multiple ways.",
    sections: [["Boosts Physical Fitness", "Tennis offers a comprehensive workout that targets multiple aspects of physical fitness. With its fast-paced rallies, rapid direction changes, and precise movements, the game strengthens your core, legs, and arms while enhancing flexibility and balance."],["Enhances Mental Well-Being", "Tennis sharpens your mind just as much as it trains your body. The sport requires you to anticipate your opponent’s actions, make split-second decisions, and adapt strategies mid-game. These cognitive demands improve concentration and problem-solving skills."],["Promotes Social Interaction", "Beyond the physical and mental benefits, tennis fosters meaningful connections. Whether you’re teaming up for doubles or attending lessons, the court is a space to form friendships, strengthen bonds, and build a supportive community."]],
    quote: "Tennis is a game of love, focus, and resilience.", close: "With its unique combination of fitness, strategy, and camaraderie, tennis enriches your life in ways few other activities can. So, step onto the court, grab your racket, and experience the health benefits for yourself."
  },
  {
    slug: "the-difference-between-a-cheap-and-an-expensive-racket", category: "Fun and Games", title: "The difference between a cheap and an expensive racket", date: "Nov 9, 2024", image: "blog-racket-2.jpg",
    excerpt: "Is the price tag really worth it? This post breaks down the key distinctions between budget-friendly and ...", lead: "How to Choose a Racket",
    intro: "When it comes to tennis rackets, the price range can vary significantly. From budget-friendly models to high-end professional rackets, choosing the right one can be a daunting task for players at any level.",
    sections: [["Material and Construction Quality", "One of the most noticeable differences between cheap and expensive tennis rackets lies in the materials used in their construction. Low-cost rackets often use basic aluminum or steel frames, while premium rackets use graphite, carbon fiber, or titanium alloys."],["Weight and Balance", "The weight and balance of a racket can significantly impact a player's performance. High-end rackets are meticulously balanced to suit various playing styles and give players the option to fine-tune the feel to exact specifications."],["Price vs. Value", "A cheap racket may be sufficient for beginners or casual players, but for serious players looking for better performance, a higher-end racket provides more control, durability, and precision."]],
    quote: "The racket doesn’t make the player, but the right racket can certainly help the player become better.", close: "In the end, the choice between a cheap and an expensive racket depends on your level of play and personal preferences. As your skills improve, investing in a high-quality racket can elevate your performance, comfort, and enjoyment on the court."
  },
  {
    slug: "best-new-year-resolutions-for-authentic-tennis-lovers", category: "News", title: "Best new year resolutions for authentic tennis lovers", date: "Jan 9, 2025", image: "blog-ball-2.jpg",
    excerpt: "Start the year with a winning mindset! From perfecting your backhand to joining a tennis club, this ...", lead: "Resolutions to Elevate Your Game",
    intro: "As the new year begins, it’s the perfect time for tennis enthusiasts to reflect on their game and set fresh goals for the upcoming season. For authentic tennis lovers, this is more than just about winning matches—it's about personal growth and connecting deeper with the game.",
    sections: [["Commit to Consistent Training", "One of the most powerful resolutions any tennis player can make is to commit to regular, focused training. Improvement doesn’t happen overnight, and consistency is key to making progress."],["Embrace the Spirit of Sportsmanship", "Tennis is known for its emphasis on respect, fair play, and sportsmanship. Commit to fostering a positive and supportive attitude, both on and off the court."],["Cultivate a Love for the Game", "At its core, tennis is a game that should be enjoyed. Continue cultivating your love for the sport, whether through casual matches, watching professional games, or learning more about tennis history and culture."]],
    quote: "The more I practice, the luckier I get.", close: "Embrace these resolutions with enthusiasm, and let 2025 be the year you take your love for tennis to new heights!"
  }
];

const link = (path = "") => `${BASE}${path}`;
const button = (text, path, cls = "btn") => `<a class="${cls}" href="${link(path)}"><span>${text}</span><span class="arrow">↗</span></a>`;

function header(theme = "light") {
  return `<header class="header header--${theme}">
    <a class="brand" href="${link()}"><img src="${A}images/${theme === "light" ? "logo-light" : "logo-dark"}.svg" alt="Smash Hit"></a>
    <nav class="nav" aria-label="Main navigation">
      <a href="${link()}">Home</a><a href="${link("story/")}">Story</a><a href="${link("programs/")}">Programs</a><a href="${link("schedule/")}">Schedule</a><a href="${link("get-in-touch/")}">Get in Touch</a>
    </nav>
    <button class="menu-toggle" type="button" aria-expanded="false" aria-label="Open menu"><span></span><span></span></button>
  </header>`;
}

function footer() {
  return `<footer class="footer">
    <div class="footer-top"><div><a href="${link()}"><img class="footer-logo" src="${A}images/logo-dark.svg" alt="Smash Hit"></a>
      <nav class="footer-nav"><a href="${link()}">Home</a><a href="${link("story/")}">Story</a><a href="${link("programs/")}">Programs</a><a href="${link("blog/")}">Blog</a></nav></div>
      <div class="footer-cta"><p>Let's play</p>${button("Apply For Camp", "get-in-touch/", "btn btn--dark")}</div></div>
    <div class="footer-bottom"><p>© Smash Hit. All Rights Reserved</p><p>Framer Templates by <a href="https://fourtwelve.co/" target="_blank" rel="noreferrer">fourtwelve.</a></p><div><a href="https://www.instagram.com/" target="_blank" rel="noreferrer">Instagram</a><a href="https://x.com/" target="_blank" rel="noreferrer">X</a><a href="https://www.facebook.com/" target="_blank" rel="noreferrer">Facebook</a></div></div>
  </footer>`;
}

function introStats() {
  return `<section class="intro section"><div class="section-grid"><div class="eyebrow reveal">LEADING #1 TENNIS CENTRE</div><div><h2 class="display reveal">We want to create an environment ideal for building craft. Our goal is to become the best tennis perfomance centre in the world.</h2></div></div>
    <div class="stats"><div><strong>10+</strong><span>Professional trainers</span></div><div><strong>12</strong><span>Classes</span></div><div><strong>18</strong><span>Courts</span></div><div><strong>10k+</strong><span>Students</span></div></div></section>`;
}

function storySection() {
  return `<section class="story-block section"><div class="story-copy"><span class="eyebrow">OUR STORY</span><h2 class="display reveal">Founded in 1964 by a team of professional tennis playersour club</h2><p>Combining a rich history with a passion for the sport, we provide world-class facilities, expert coaching, and a welcoming environment for players of all levels. Join us to experience the legacy and love for tennis that continues to inspire champions and enthusiasts alike.</p>${button("About Us", "story/", "text-link")}</div><div class="story-images"><img src="${A}images/story-tall.jpg" alt="Tennis player"><img src="${A}images/story-racket.jpg" alt="Tennis racket"></div></section>`;
}

function classesSection() {
  return `<section class="classes section"><div class="section-grid"><div class="eyebrow">CLASSES</div><div><h2 class="display reveal">Tennis lessons are a great gift for Christmas or Birthdays all year round</h2><p>Can help someone work on something specific or develop your overall game and strategy!</p>${button("View Our Programs", "programs/", "text-link")}</div></div><img class="wide-image reveal" src="${A}images/classes.jpg" alt="Tennis player"></section>`;
}

function coachesSection() {
  const people = [["Brooklyn Simmons","coach-1.jpg"],["Jenny Wilson","coach-2.jpg"],["Bessie Cooper","coach-3.jpg"],["Albert Flores","coach-4.jpg"]];
  return `<section class="coaches section"><div class="section-grid"><span class="eyebrow">OUR COACHES</span><h2 class="display reveal">Grow your skill with academy team</h2></div><div class="coach-grid">${people.map(([n,i])=>`<article class="coach-card reveal"><div class="image-wrap"><img src="${A}images/${i}" alt="${n}"></div><h3>${n}</h3><p>Professional Coach</p></article>`).join("")}</div></section>`;
}

function processSection(label = "Training Process") {
  return `<section class="process"><img src="${A}images/rackets.jpg" alt="Tennis rackets"><div class="process-overlay"><img src="${A}images/pause.svg" alt=""><span>CLASSES</span><h2>${label}</h2><p>TRAINING PROCESS</p></div></section>`;
}

function testimonialSection() {
  return `<section class="testimonial section"><img src="${A}images/testimonial.jpg" alt="Tennis player"><div><h2 class="display reveal">Unique venue.<br>Exceptional team.<br>One passion.</h2><blockquote>“We want to create an environment ideal for building craft. Our goal is to become the best tennis perfomance centre in the world”</blockquote><p class="author">Ioan Morgan <span>Coach of Courtage</span></p></div></section>`;
}

function pricing() {
  const plans = [["Junior","250","Juniors must be less than 19 years old as at 1st January"],["Individual","350","Save $98 yearly compared to the monthly plan."],["Recommended","499","Invite your family to train with you and save $128"]];
  return `<section class="pricing section"><span class="eyebrow">CLUB MEMBERSHIP</span><h2 class="display reveal">Select the best plan</h2><div class="price-grid">${plans.map(([name,price,desc],i)=>`<article class="price-card ${i===2?"featured":""}"><p>${name}</p><div class="price"><span>$</span><strong>${price}</strong><small>month</small></div><p>${desc}</p>${button("Join", "get-in-touch/", i===2?"btn btn--light":"btn btn--dark")}</article>`).join("")}</div></section>`;
}

function innerHero(kicker, title, image, position="center") {
  return `<section class="inner-hero" style="--hero:url('${A}images/${image}');--pos:${position}">${header("light")}<div class="inner-hero__copy"><span>${kicker}</span><h1>${title}</h1></div></section>`;
}

function home() {
  return `<main id="main"><section class="home-hero">${header("light")}<video autoplay muted loop playsinline poster="${A}images/hero.jpg"><source src="${A}video/hero.mp4" type="video/mp4"></video><div class="shade"></div><div class="hero-copy"><h1>Being fast in tennis<br>is everything.</h1><p>Study <i></i> Practice <i></i> Play <i></i> Win</p>${button("Apply For Camp", "get-in-touch/", "btn btn--outline")}</div></section>${introStats()}${storySection()}${classesSection()}${coachesSection()}${processSection()}${testimonialSection()}${pricing()}</main>${footer()}`;
}

function storyPage() {
  return `<main id="main">${innerHero("ABOUT US","Who We Are","story-player.jpg","center 35%")}<section class="about-intro section"><div class="section-grid"><span class="eyebrow">ABOUT</span><div><h2 class="display reveal">We strive to unite passion for the sport with a welcoming community.</h2><p>From beginners to seasoned players, we provide top-notch facilities, expert coaching, and a love for tennis. Our mission is to inspire confidence, foster growth, and create unforgettable experiences on the court. Join us to improve your game, make connections, and enjoy every serve!</p>${button("Get In Touch","get-in-touch/","text-link")}</div></div></section><section class="venue section"><img src="${A}images/story-racket.jpg" alt="Tennis racket"><div><h2 class="display reveal">Unique venue.<br>Exeptional team.<br>One passion.</h2><p>“We want to create an environment ideal for building craft. Our goal is to become the best tennis perfomance centre in the world”</p></div></section>${classesSection()}${coachesSection()}${storySection()}${testimonialSection()}${pricing()}</main>${footer()}`;
}

function programsPage() {
  const programs = [
    ["Juniors Programs","Our Juniors Programs are designed to nurture young talent and build a strong foundation for future success. With age-specific training, skilled coaches, and a focus on both technique and fun, we help young players develop their skills, confidence, and love for the game.","program-junior.jpg"],
    ["Adult Programs","Our Adult Programs cater to players of all skill levels, from beginners to seasoned competitors. Whether you're looking to improve your technique, boost fitness, or enjoy social matches, we provide tailored coaching and dynamic training sessions.","story-player.jpg"],
    ["Tournaments","Our tournaments provide an exciting platform for players to test their skills, gain competitive experience, and enjoy the thrill of the game. Open to all levels, these events foster a sense of community while challenging participants to push their limits.","court.jpg"]
  ];
  return `<main id="main">${innerHero("","Programs","program-junior.jpg","center 40%")} ${introStats()}<section class="programs section"><span class="eyebrow">OUR PROGRAMS</span><h2 class="display reveal">Make learning tennis simple, safe and fun</h2><div class="program-list">${programs.map(([title,text,img],i)=>`<article class="program-row ${i%2?"reverse":""}"><img src="${A}images/${img}" alt="${title}"><div><span>0${i+1}</span><h3>${title}</h3><p>${text}</p>${button("Explore & Register","get-in-touch/","text-link")}</div></article>`).join("")}</div></section>${pricing()}</main>${footer()}`;
}

function schedulePage() {
  const items=["8:00 Breakfast","9:30 Training","11:20 Break","11:30 Training","13:30 Rest","14:00 Lunch","16:00 Training","17:30 Break","17:40 Training","19:30 Rest","20:00 Dinner","23:00 Quiet hour"];
  return `<main id="main">${innerHero("","Schedule","blog-racket.jpg","center")} ${introStats()}<section class="schedule section"><div class="section-grid"><div><span class="eyebrow">SCHEDULE</span><h2 class="display reveal">Training Schedule</h2></div><p>The training schedule can suffer some variations depending on the season. The day is always divided by two turns in the morning and other two in the afternoon, normally one of tennis and one of fitness, introducing always the mental work and if necessary the physiotherapist service</p></div><div class="schedule-list">${items.map((item,i)=>{const [time,...name]=item.split(" ");return `<div><span>${String(i+1).padStart(2,"0")}</span><strong>${time}</strong><p>${name.join(" ")}</p></div>`}).join("")}</div></section>${pricing()}</main>${footer()}`;
}

function contactPage() {
  const steps=[["Step 1: Contact Us","Reach out to us via phone, email, or visit to discuss your goals and start your tennis journey."],["Step 2: Selection Test","Take our personalized selection test to assess your skills and determine the best program for your needs. This evaluation helps us understand your strengths, identify areas for improvement, and place you in a training plan aligned with your goals."],["Step 3: Registration","Complete your registration to secure your spot and get ready to start training with us!"]];
  return `<main id="main">${innerHero("","Get In Touch","court.jpg","center")}<section class="contact section"><div class="contact-copy"><h2 class="display reveal">We’re here to assist you!</h2><p>Whether you have questions, need details, or are ready to start, reach out via phone, email, or visit us. Let’s work together to take your tennis game to the next level!</p><a href="https://maps.app.goo.gl/ycX9wJk1W7EFY1it5" target="_blank" rel="noreferrer"><img src="${A}images/icon-map.svg" alt="">3rd Avenue, 83 Manhattan, London, UK</a><a href="tel:+12124258617"><img src="${A}images/icon-phone.svg" alt="">+1 212 425 8617</a><a href="mailto:info@example.com"><img src="${A}images/icon-mail.svg" alt="">information@office.com</a></div><form class="contact-form"><h2>Join Our Team</h2><label>Name<input required name="name" autocomplete="name"></label><label>Email<input required type="email" name="email" autocomplete="email"></label><label>Phone<input type="tel" name="phone" autocomplete="tel"></label><label>Message<textarea required name="message" rows="4"></textarea></label><button class="btn btn--dark" type="submit">Submit <span>↗</span></button><p class="form-status" aria-live="polite"></p></form></section><section class="join section"><span class="eyebrow">OUR PROGRAMS</span><h2 class="display reveal">The 3 steps to join the our program</h2><div class="steps">${steps.map(([h,p],i)=>`<article><span>0${i+1}</span><h3>${h}</h3><p>${p}</p></article>`).join("")}</div>${button("View Our Programs","programs/","text-link")}</section>${processSection("Training Process")}${pricing()}</main>${footer()}`;
}

function articleCard(article) {
  return `<a class="blog-card reveal" href="${link(`blog/${article.slug}/`)}"><div class="image-wrap"><img src="${A}images/${article.image}" alt="${article.title}"></div><span>${article.category}</span><h2>${article.title}</h2><p>${article.excerpt}</p></a>`;
}

function blogPage() {
  return `<main id="main">${innerHero("BLOG","Our Blog","blog-hero.jpg","center")}<section class="blog-layout section"><div class="blog-grid">${articles.map(articleCard).join("")}</div><aside><label><span class="sr-only">Search articles</span><input id="blog-search" type="search" placeholder="Enter your key word"></label><h3>Recent Posts</h3>${articles.slice(0,3).map(a=>`<a href="${link(`blog/${a.slug}/`)}"><strong>${a.title}</strong><span>${a.date}</span></a>`).join("")}</aside></section>${pricing()}</main>${footer()}`;
}

function articlePage(slug) {
  const a=articles.find(x=>x.slug===slug) || articles[0];
  const related=articles.filter(x=>x.slug!==a.slug).slice(0,3);
  return `<main id="main" class="article-page">${header("dark")}<article class="article section"><a class="back" href="${link("blog/")}">← Go Back</a><div class="article-head"><span>${a.category}</span><h1>${a.title}</h1><time>${a.date}</time></div><img class="article-cover" src="${A}images/${a.image}" alt="${a.title}"><div class="article-body"><h2>${a.lead}</h2><p>${a.intro}</p>${a.sections.map(([h,p])=>`<h2>${h}</h2><p>${p}</p>`).join("")}<blockquote>“${a.quote}”</blockquote><p>${a.close}</p></div></article><section class="related section"><div class="blog-grid">${related.map(articleCard).join("")}</div></section>${pricing()}</main>${footer()}`;
}

function notFound(){return `<main id="main" class="not-found">${header("dark")}<div><span>404</span><h1>Page not found</h1><p>The ball landed outside the line.</p>${button("Back to Home","")}</div></main>${footer()}`}

const page=document.body.dataset.page;
const views={home,story:storyPage,programs:programsPage,schedule:schedulePage,contact:contactPage,blog:blogPage,"not-found":notFound};
document.querySelector("#site").innerHTML=page==="article"?articlePage(document.body.dataset.slug):(views[page]||notFound)();

const menuButton=document.querySelector(".menu-toggle");
menuButton?.addEventListener("click",()=>{const open=document.body.classList.toggle("menu-open");menuButton.setAttribute("aria-expanded",String(open));});
const pagesButton=document.querySelector(".pages-toggle");
pagesButton?.addEventListener("click",()=>{const open=document.body.classList.toggle("pages-open");pagesButton.setAttribute("aria-expanded",String(open));});
document.querySelectorAll(".nav a,.pages-menu a").forEach(a=>{if(new URL(a.href).pathname===location.pathname)a.classList.add("active")});

const observer=new IntersectionObserver((entries)=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add("is-visible");observer.unobserve(entry.target)}}),{threshold:.12});
document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));

document.querySelector(".contact-form")?.addEventListener("submit",event=>{event.preventDefault();const form=event.currentTarget;form.querySelector(".form-status").textContent="Thank you. Your message has been received.";form.reset();});
document.querySelector("#blog-search")?.addEventListener("input",event=>{const q=event.target.value.toLowerCase();document.querySelectorAll(".blog-card").forEach(card=>card.hidden=!card.innerText.toLowerCase().includes(q));});

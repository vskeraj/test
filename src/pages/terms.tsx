import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Terms = () => (
  <div className="min-h-screen bg-background">
    <Header />
    <div className="container mx-auto px-4 lg:px-8 py-16">
      <div className="max-w-3xl mx-auto prose-invert">
        <h1 className="font-display text-4xl text-foreground mb-8">Terms & Conditions</h1>
        {[
          { title: "1. General Terms", text: "By accessing and using Firefly bookstore, you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, you must not use our services." },
          { title: "2. Accounts", text: "You are responsible for maintaining the confidentiality of your account credentials. You must notify us immediately of any unauthorized access to your account." },
          { title: "3. Orders & Payments", text: "All prices are displayed in USD and include applicable taxes. We reserve the right to modify prices at any time. Payment is required at the time of purchase." },
          { title: "4. Shipping & Delivery", text: "We aim to process and ship orders within 2 business days. Delivery times vary by location. We are not responsible for delays caused by shipping carriers." },
          { title: "5. Returns & Refunds", text: "Books may be returned within 30 days of delivery in their original condition. Refunds will be processed within 5-10 business days after we receive the returned item." },
          { title: "6. Privacy", text: "Your personal information is protected in accordance with our Privacy Policy. We do not sell or share your data with third parties without your consent." },
          { title: "7. Intellectual Property", text: "All content on this website, including text, images, and design, is the property of Firefly and protected by copyright laws." },
        ].map(({ title, text }) => (
          <div key={title} className="mb-8">
            <h2 className="font-display text-xl text-foreground mb-3">{title}</h2>
            <p className="text-muted-foreground leading-relaxed text-sm">{text}</p>
          </div>
        ))}
      </div>
    </div>
    <Footer />
  </div>
);

export default Terms;

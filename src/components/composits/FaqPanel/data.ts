export interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

export const faqs: FAQItem[] = [
  {
    id: 1,
    question: "🏪 Is this platform suitable for small, local pharmacies?",
    answer:
      "Absolutely. Our platform is designed to be as effective for independent, single-location pharmacies as it is for large chains. We’ve intentionally kept the interface clean, fast, and clutter-free so you’re not overwhelmed with features you don’t need. Whether you're just starting out or scaling to multiple branches, the system adapts to your size, offering the right tools at the right time — without the bloat or unnecessary complexity of legacy software.",
  },
  {
    id: 2,
    question: "🧠 Do I need any technical knowledge to use it?",
    answer:
      "Not at all. We built this platform with non-technical pharmacy owners and staff in mind. If you can use a smartphone or browse the web, you can use our system. Everything is intuitive and easy to navigate — from adding inventory to generating invoices and reports. No complicated setup, no coding, and no steep learning curve. And if you do run into something confusing, our support team is just a message away.",
  },
  {
    id: 3,
    question: "📦 Can I track expired and low-stock medicines?",
    answer:
      "Yes — and then some. Our intelligent inventory management system continuously monitors expiry dates and stock levels. You’ll receive automatic alerts when items are about to expire or are running low, giving you enough time to act — reorder, return, or mark down. It helps you prevent financial loss, maintain compliance, and ensure your customers always find what they need on your shelves.",
  },
  {
    id: 4,
    question: "🤝 What if I need help setting things up?",
    answer:
      "We’ve got your back. Our onboarding process is designed to be as simple and quick as possible, with guided steps to get you up and running in no time. But if you prefer a human touch, we offer 12/7 customer support from real people who actually understand your business. Whether it’s your first time using pharmacy software or you're migrating from a different system, we’ll walk you through it — no stress.",
  },
  {
    id: 5,
    question: "🔐 Is my data safe?",
    answer:
      "Yes, and we take that responsibility seriously. Your data is protected with industry-standard encryption both in transit and at rest. We host everything in secure, modern cloud environments with built-in redundancy, automated backups, and strict access controls. Only authorized users with proper permissions can view or modify sensitive data. You own your data — we just keep it safe and accessible.",
  },
  {
    id: 6,
    question: "🧾 Can I print VAT-compliant bills for my country?",
    answer:
      "Yes, you can print professional invoices right out of the system. We include templates that follow standard tax and VAT formats which can be customized for your region. Since tax laws vary by country and even by state, we recommend double-checking with your local accountant for full compliance. But rest assured — everything from tax breakdowns to customer details can be printed cleanly and clearly.",
  },
  {
    id: 7,
    question: "💰 How much does it cost?",
    answer:
      "We believe pricing should be straightforward — no hidden fees, no bait-and-switch. Our pricing model is designed to be transparent and flexible based on your needs. You’ll only pay for what you use, with plans that grow as you do. Visit our Pricing section for current plans and features, or reach out to us for a custom quote tailored to your pharmacy’s size and goals.",
  },
  {
    id: 8,
    question: "🌐 Do I need internet to use it?",
    answer:
      "Yes. This is a cloud-based system, which means it relies on an internet connection to function optimally. That’s how we keep your data synced, backed up, and always accessible from any device. The system is optimized for low-bandwidth environments too — so even basic internet is enough to keep things running smoothly. No bulky software installs, no complicated networking.",
  },
  {
    id: 9,
    question: "🛡️ Can I control what my staff can see or do?",
    answer:
      "Definitely. Our role-based access control lets you assign permissions down to the smallest details — from viewing reports to editing prices, or even accessing customer data. This means every staff member sees only what they need to do their job, and nothing more. No more sharing accounts, no more security risks. You stay in control of your business and your data at all times.",
  },
  {
    id: 10,
    question: "🏢 Do you support multiple branches?",
    answer:
      "Yes — seamlessly. Whether you operate two stores or twenty, you can manage them all from a unified dashboard. Monitor each branch’s performance individually or collectively, transfer inventory between locations, and assign different user roles for each store. The system is designed to scale with your business without complicating your workflow.",
  },
  {
    id: 11,
    question: "📱 Is there a mobile app?",
    answer:
      "Not yet — but it's in the works! Our team is actively developing a mobile app to give you and your staff the flexibility to manage your pharmacy on the go. From checking sales reports to scanning inventory right from your phone, the mobile app will extend the power of the platform into your pocket. Stay tuned — we'll notify users as soon as it's ready.",
  },
  {
    id: 12,
    question: "📂 Can I migrate from my current system?",
    answer:
      "Yes, and we’ll make it as painless as possible. Whether you're using spreadsheets, legacy software, or another POS system, we provide tools and support to help you move your data safely and quickly. Our migration assistants can help import customers, inventory, billing history, and more — so you can start strong without losing valuable records.",
  },
];

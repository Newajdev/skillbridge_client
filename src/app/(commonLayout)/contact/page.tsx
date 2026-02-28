import { Card, CardContent } from "@/components/ui/card";
import ContactForm from "@/components/modules/contact/ContactForm";

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen bg-muted/30 pb-24 pt-24 md:pt-32">
      <div className="container mx-auto px-4 relative z-20 flex justify-center">
        <div className="w-full max-w-4xl">
          {/* Contact Form */}
          <Card className="rounded-[32px] border-none shadow-2xl bg-white p-8 md:p-12">
            <CardContent className="p-0 space-y-10">
              <div className="space-y-4">
                <h3 className="text-3xl font-bold text-[#173e72]">
                  Send us a Message
                </h3>
                <p className="text-muted-foreground text-lg">
                  {
                    "Have a specific inquiry? Fill out the form below and we'll get back to you within 24 hours."
                  }
                </p>
              </div>

              <ContactForm />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

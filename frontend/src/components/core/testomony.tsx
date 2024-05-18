interface Testimonial {
    rating: string;
    date: string;
    text: string;
    author: string;
    logoSrc: string;
}

const testimonials: Testimonial[] = [
    {
        rating: "★★★★★",
        date: "02/28/2023",
        text: "Metomic helps us identify sensitive information in applications where we previously had no or limited visibility.",
        author: "Bud B",
        logoSrc: "path/to/g2-logo.png",
    },
    {
        rating: "★★★★☆",
        date: "02/28/2023",
        text: "We use Metomic to uncover sensitive company data and prevent it from being shared or residing in places it shouldn't.",
        author: "Colin O",
        logoSrc: "path/to/g2-logo.png",
    },
    {
        rating: "★★★★★",
        date: "02/28/2023",
        text: "We are a Slack and Google shop, and Metomic had out-of-the-box integrations that made implementation a breeze.",
        author: "Tim C",
        logoSrc: "path/to/g2-logo.png",
    },
    {
        rating: "★★★★★",
        date: "02/28/2023",
        text: "It's helping us to control any sensitive information being shared across the organisation. It also allows us to restrict users from sharing such information online.",
        author: "Vamshi N",
        logoSrc: "path/to/g2-logo.png",
    },
];

const Portfolio = () => {
    return (
        <div className="bg-gray-100 py-12 text-center">
            <div className="container mx-auto">
                <h6 className="text-gray-500">DON'T WAIT UNTIL IT'S TOO LATE</h6>
                <h2 className="text-3xl font-semibold text-gray-800 my-4">
                    Join Infosec leaders securing their data
                </h2>
                <div className="flex flex-wrap justify-center px-10">
                    {testimonials.map((testimonial, index) => (
                        <div
                            key={index}
                            className="bg-white m-4 max-w-sm p-6 rounded-lg shadow-md text-left"
                        >
                            <div className="flex justify-between items-center mb-4">
                                <div className="text-yellow-500 text-lg">{testimonial.rating}</div>
                                <div className="text-gray-400 text-sm">{testimonial.date}</div>
                            </div>
                            <p className="text-gray-700 mb-4">{testimonial.text}</p>
                            <div className="flex items-center">
                                <img
                                    src={testimonial.logoSrc}
                                    alt="G2 Logo"
                                    className="w-6 h-6 mr-2"
                                />
                                <span className="font-bold text-gray-800">{testimonial.author}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Portfolio;

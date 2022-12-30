import React from "react";

const ContactForm = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const first_name = form.firstname.value;
    const last_name = form.lastname.value;
    const email = form.email.value;
    const subject = form.subject.value;
    const message = form.message.value;

    const messageDetails = {
      first_name,
      last_name,
      email,
      subject,
      message,
    };

    fetch("https://prime-api-5jzf.onrender.com/messages", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(messageDetails),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.acknowledged) {
          alert("Sent successfully");
          form.reset();
        }
      })
      .catch((error) => console.error(error));
  };
  return (
    <div>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 my-8 rounded md:grid-cols-2 gap-5 bg-gray-100 dark:bg-DarkGray">
          <div className="p-10">
            <h1 className="text-3xl">Let’s get in touch</h1>
            <p className="my-5">
              <small>
                I have world-class, flexible support via live chat, email &
                phone. I guar antee that you’ll be able to have any issue
                resolved within 24/7
              </small>
            </p>
            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 lg:grid-cols-2 gap-3"
            >
              <div>
                <label>
                  First Name
                  <input
                    name="firstname"
                    type="text"
                    required
                    placeholder="Enter Your First name "
                    className="block w-full border rounded mt-2 h-10 "
                  />
                </label>
              </div>
              <div>
                <label>
                  Last Name
                  <input
                    name="lastname"
                    type="text"
                    required
                    placeholder="Enter Your Last Name"
                    className="block w-full border rounded mt-2 h-10"
                  />
                </label>
              </div>
              <div>
                <label>
                  Email
                  <input
                    name="email"
                    type="email"
                    required
                    placeholder="Enter Your Email"
                    className="block w-full border rounded mt-2 h-10"
                  />
                </label>
              </div>
              <div>
                <label>
                  Subject
                  <input
                    name="subject"
                    type="text"
                    required
                    placeholder="Enter Your Subject"
                    className="block w-full border rounded mt-2 h-10"
                  />
                </label>
              </div>
              <div className="col-span-2">
                <label>
                  Your Message
                  <textarea
                    name="message"
                    type="text"
                    required
                    placeholder="Enter Your Message"
                    className="block w-full border rounded mt-2"
                  ></textarea>
                </label>
              </div>
              <button
                type="submit"
                className=" rounded-full  p-3 w-full sm:w-56   bg-gradient-to-r from-sky-600  to-teal-300 text-white text-lg font-semibold "
              >
                Send message
              </button>
              {/* <input className='rounded bg-cyan-600 hover:bg-white h-10' type="submit" value='Send message' /> */}
            </form>
          </div>
          <div className="p-10">
            <div className="p-10 hover:shadow-lg rounded">
              <h3 className="font-bold text-xl">Phone</h3>
              <p>Our customer care is open from Mon-Fri, 10:00 am to 6:00 pm</p>
              <p className="my-2 font-bold">+880 122 4333 444</p>
            </div>
            <div className="p-10 hover:shadow-lg rounded">
              <h3 className="font-bold text-xl">Email</h3>
              <p>
                Our support team will be reply in 48-h during your Question.
              </p>
              <p className="my-2 font-bold">prime@gmail.com</p>
            </div>
            <div className="p-10 hover:shadow-lg rounded">
              <h3 className="font-bold text-xl">Location</h3>
              <p>168/170, Ave 01, Dhanmondi, Bangladesh</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;

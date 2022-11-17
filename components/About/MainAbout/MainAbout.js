/* eslint-disable @next/next/no-img-element */

const MainAbout = () => {
  return (
    <div>
      <div className=" bg-sky-500">
        <div className="pt-48 pb-32 text-center container px-4 mx-auto">
          <h1 className="text-5xl">About Us</h1>
        </div>
      </div>

      <div className="container px-4 mx-auto sm:grid grid-cols-2 mt-10   ">
        <div className="w-full">
          <img className="w-11/12" src="about.png" alt="" />
        </div>
        <div className="w-96">
          <h2 className="text-3xl">A united world, connected by technology</h2>
          <ul className="list-disc">
            <li className="my-2">
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking.
            </li>
            <li className="my-2">
              The point of using Lorem Ipsum is that it has a more-or-less
              normal distribution of letters.
            </li>
            <li className="my-2">
              Many desktop publishing packages and web page editors now use
              Lorem Ipsum.
            </li>
          </ul>
          <hr />
          <p className="mb-0">
            “Many desktop publishing packages and web page editors now use Lorem
            Ipsum as their default model text, and a search for will uncover
            many web sites still in their infancy.”
          </p>
        </div>
      </div>

      <div className="container px-4 mx-auto text-center my-10 w-96">
        <h2 className="text-3xl">Meet our (awesome) team</h2>
        <p>
          It is a long established fact that a reader will be distracted by the
          readable content of a page when looking at its layout.
        </p>
      </div>

      <div className="grid grid-cols-3 items-center text-center container px-4 mx-auto">
        <div>
          <hr />
        </div>
        <div className="text-2xl">Team Member</div>
        <div>
          {" "}
          <hr />
        </div>
      </div>

      <div className="sm:flex text-center justify-center container px-4 mx-auto my-10">
        <div className="mx-5 card ">
          <img
            className=" object-cover rounded-md"
            style={{ width: "200px", height: "200px" }}
            src="sohan.jpeg"
            alt=""
          />
          <h3 className="font-bold">Tanvir Hasan Sohan</h3>
          <p>Junior web Developer</p>
        </div>
        <div className="mx-5" style={{ width: "200px", height: "200px" }}>
          <img
            className=" object-cover rounded-md"
            style={{ width: "200px", height: "200px" }}
            src="shihab_pic.jpg"
            alt=""
          />
          <h3 className="font-bold">Shajibul Alam Shihab</h3>
          <p>Junior web Developer</p>
        </div>
        <div className="mx-5" style={{ width: "200px", height: "200px" }}>
          <img
            className=" object-cover rounded-md"
            style={{ width: "200px", height: "200px" }}
            src="mishon.jpeg"
            alt=""
          />
          <h3 className="font-bold">Muhtakim Safat Mishon</h3>
          <p>Junior web Developer</p>
        </div>
      </div>
    </div>
  );
};

export default MainAbout;

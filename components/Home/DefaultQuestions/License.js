import React from "react";

const License = () => {
  return (
    <div>
      <div className="flex flex-col divide-gray-700">
        <details className="dark:bg-zinc-800 bg-slate-200 p-3 mb-2 border-b-gray-500 border-b-2 text-lg rounded bshadow">
          <summary className="py-2 outline-none cursor-pointer focus:underline">
            What is your refund policy and terms and conditions?
          </summary>
          <div className="px-4 pb-4">
            <p>
              We comply fully with Envato’s refund policy. We issue refunds for
              the reasons Envato permits us to give refund and we don’t issue
              refunds on the cases Envato does not guarantee refunds.
            </p>
          </div>
        </details>
        <details className="dark:bg-zinc-800 bg-slate-200 p-3 mb-2 border-b-gray-500 border-b-2 text-lg rounded bshadow">
          <summary className="py-2 outline-none cursor-pointer focus:underline">
            How many shortcodes/blocks/elements are there in Rogan?
          </summary>
          <div className="px-4 pb-4">
            <p>
              There are over 200 shortcodes/blocks/elements in Rogan WordPress
              Theme. You can use any block/element into any page as you want.
            </p>
          </div>
        </details>
        <details className="dark:bg-zinc-800 bg-slate-200 p-3 mb-2 border-b-gray-500 border-b-2 text-lg rounded bshadow">
          <summary className="py-2 outline-none cursor-pointer focus:underline">
            Is Rogan Gutenberg comptible and latest WordPress supported?
          </summary>
          <div className="px-4 pb-4 space-y-2">
            <p>Yes, SaasLand is compatible with Gutenberg.</p>
          </div>
        </details>
        <details className="dark:bg-zinc-800 bg-slate-200 p-3 mb-2 border-b-gray-500 border-b-2 text-lg rounded bshadow">
          <summary className="py-2 outline-none cursor-pointer focus:underline">
            Is there a warranty on my item or a guaranty on my item?
          </summary>
          <div className="px-4 pb-4 space-y-2">
            <p>
              Volutpat? Magni labore dapibus minus unde fermentum illo nunc,
              vestibulum earum eveniet, ipsam urna, excepturi! Autem, proin quam
              tempora! Suscipit cupidatat vitae, vitae.
            </p>
          </div>
        </details>
        <details className="dark:bg-zinc-800 bg-slate-200 p-3 mb-2 border-b-gray-500 border-b-2 text-lg rounded bshadow">
          <summary className="py-2 outline-none cursor-pointer focus:underline">
            How many websites can I use Rogan in with a reular license?
          </summary>
          <div className="px-4 pb-4 space-y-2">
            <p>
              According to Envato’s licensing, you can use SaasLand or any other
              theme on only one website. If you want to use it on multiple
              websites, you must buy multiple licenses.
            </p>
          </div>
        </details>
      </div>
    </div>
  );
};

export default License;

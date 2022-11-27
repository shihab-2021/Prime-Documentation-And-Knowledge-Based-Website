import * as React from "react";

export default function NewCategory() {
  return (
    <div>
      <div className="flex flex-col divide-gray-700">
        <details className="dark:bg-zinc-800 bg-slate-200 p-3 mb-2 border-b-gray-500 border-b-2 text-lg rounded bshadow">
          <summary className="py-2 outline-none cursor-pointer focus:underline">
            Is the theme supported WPML and MailChimp Subscribe form?
          </summary>
          <div className="px-4 pb-4">
            <p>
              Yes, SaasLand comes with ThemeForest’s standard 6 months support.
              We conduct the support via theme’s “Comments” section and also our
              support ticketing system.
            </p>
          </div>
        </details>
        <details className="dark:bg-zinc-800 bg-slate-200 p-3 mb-2 border-b-gray-500 border-b-2 text-lg rounded bshadow">
          <summary className="py-2 outline-none cursor-pointer focus:underline">
            How do I repair an Item on envato market?
          </summary>
          <div className="px-4 pb-4">
            <p>
              Why I say old chap that is spiffing pukka, bamboozled wind up
              bugger buggered zonked hanky panky a blinding shot the little
              rotter, bubble and squeak vagabond cheeky bugger at public school
              pardon you bloke the BBC. Tickety-boo Elizabeth plastered matie.!
            </p>
          </div>
        </details>
      </div>
    </div>
  );
}

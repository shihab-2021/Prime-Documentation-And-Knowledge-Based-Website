import * as React from 'react'


export default function Returns() {

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
            What will happen if my support is expired after purchasing my item?
          </summary>
          <div className="px-4 pb-4">
            <p>
              After the 6-month period is over you can buy extended support. You
              can buy extended support in the beginning, too. I that case you
              get a 1-year support in total.
            </p>
          </div>
        </details>
        <details className="dark:bg-zinc-800 bg-slate-200 p-3 mb-2 border-b-gray-500 border-b-2 text-lg rounded bshadow">
          <summary className="py-2 outline-none cursor-pointer focus:underline">
            Is the price of the theme one-time or recurring(monthly/yearly)?
          </summary>
          <div className="px-4 pb-4">
            <p>
              The payment is one-time. After you pay the one-time price of the
              theme, you will never be charged for it. But you can buy extended
              support after your support expires after 6 months.
            </p>
          </div>
        </details>
        <details className="dark:bg-zinc-800 bg-slate-200 p-3 mb-2 border-b-gray-500 border-b-2 text-lg rounded bshadow">
          <summary className="py-2 outline-none cursor-pointer focus:underline">
            How do I repair an item on envato market?
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

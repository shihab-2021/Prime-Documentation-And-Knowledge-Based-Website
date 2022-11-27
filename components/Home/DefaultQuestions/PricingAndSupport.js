import * as React from 'react'


export default function PricingAndSupport() {
  return (
    <div>
      <div className="flex flex-col divide-gray-700">
        <details className="dark:bg-zinc-800 bg-slate-200 p-3 mb-2 border-b-gray-500 border-b-2 text-lg rounded bshadow">
          <summary className="py-2 outline-none cursor-pointer focus:underline">
            What things and what area are covered in support?
          </summary>
          <div className="px-4 pb-4">
            <p>
              In brief, we are responsible for the features that are advertised
              in the theme. So we will do the following: <br />– Solve bugs if
              there is any (bug means if any feature is not working as it
              should) <br />
              – If you have any question we will answer it <br /> – After your
              installation if you face any issues/bugs, we can look <br /> into
              your website or server, but we don’t guarantee any solution or
              custom works there.
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
            Is the theme supported WPML ad MailChimp Subscribe form?
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
      </div>
    </div>
  );
}

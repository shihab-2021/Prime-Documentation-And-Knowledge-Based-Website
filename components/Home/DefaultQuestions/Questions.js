import React, { useState } from 'react';
import License from './License';
import NewCategory from './NewCategory';
import PricingAndSupport from './PricingAndSupport';
import PurchasingOnline from './PurchasingOnline';
import Returns from './Returns';
import Technical from './Technical';

const Questions = () => {
    const [expanded, setExpanded] = useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
      setExpanded(isExpanded ? panel : false);
    };
    const [toggleState, setToggleState] = useState(1);

    const toggleTab = (index) => {
      setToggleState(index);
    };
    return (
      <div>
        <div className="container mx-auto px-4">
          <div className="pt-28 text-center">
            <h1 className="pb-3 text-3xl font-bold">
              Do you have any Question?
            </h1>
            <p>
              Loaded with awesome features like Documentation, Knowledgebase,
            </p>
            <p className="pb-12">Forum & more!</p>
          </div>
          <div className="grid grid-cols-12 md:gap-4 lg:gap-28">
            <div className="col-span-12 md:pb-28 pb-5 md:col-span-4 lg:col-span-3">
              <div className="bshadow rounded p-5 dark:bg-DarkGray bg-slate-200">
                <p className="pt-4 pb-7 text-2xl font-semibold">
                  Quick Navigation
                </p>
                <div className="flex flex-col">
                  <button
                    className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
                    onClick={() => toggleTab(1)}
                  >
                    <span className="float-left pl-3">License</span>
                    <span className="float-right pr-3">{">"}</span>
                  </button>
                  <button
                    className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
                    onClick={() => toggleTab(2)}
                  >
                    <span className="float-left pl-3">New Category</span>
                    <span className="float-right pr-3">{">"}</span>
                  </button>
                  <button
                    className={toggleState === 3 ? "tabs active-tabs" : "tabs"}
                    onClick={() => toggleTab(3)}
                  >
                    <span className="float-left pl-3">Pricing & Support</span>
                    <span className="float-right pr-3">{">"}</span>
                  </button>
                  <button
                    className={toggleState === 4 ? "tabs active-tabs" : "tabs"}
                    onClick={() => toggleTab(4)}
                  >
                    <span className="float-left pl-3">Purchasing Online</span>
                    <span className="float-right pr-3">{">"}</span>
                  </button>
                  <button
                    className={toggleState === 5 ? "tabs active-tabs" : "tabs"}
                    onClick={() => toggleTab(5)}
                  >
                    <span className="float-left pl-3">Returns</span>
                    <span className="float-right pr-3">{">"}</span>
                  </button>
                  <button
                    className={toggleState === 6 ? "tabs active-tabs" : "tabs"}
                    onClick={() => toggleTab(6)}
                  >
                    <span className="float-left pl-3">Technical</span>
                    <span className="float-right pr-3">{">"}</span>
                  </button>
                </div>
              </div>
            </div>
            <div className="content-tabs col-span-12 pb-20 md:col-span-8 md:ml-4 lg:col-span-6 xl:col-span-8">
              <div
                className={
                  toggleState === 1 ? "content  active-content" : "content"
                }
              >
                <License></License>
              </div>
              <div
                className={
                  toggleState === 2 ? "content  active-content" : "content"
                }
              >
                <NewCategory></NewCategory>
              </div>
              <div
                className={
                  toggleState === 3 ? "content  active-content" : "content"
                }
              >
                <PricingAndSupport></PricingAndSupport>
              </div>
              <div
                className={
                  toggleState === 4 ? "content  active-content" : "content"
                }
              >
                <PurchasingOnline></PurchasingOnline>
              </div>
              <div
                className={
                  toggleState === 5 ? "content  active-content" : "content"
                }
              >
                <Returns></Returns>
              </div>
              <div
                className={
                  toggleState === 6 ? "content  active-content" : "content"
                }
              >
                <Technical></Technical>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
};

export default Questions;
import React from 'react';

function SignInForm() {
  return (
    <div className="flex flex-col flex-1 shrink py-10 basis-0 min-w-[240px] max-md:max-w-full max-sm:hidden">
      <h2 data-layername="column" className="overflow-hidden w-full text-lg font-bold text-center whitespace-nowrap text-blue-950 max-md:max-w-full">
        請登陸以上傳照片及獲得廢物分類標記提示
      </h2>
      <form className="flex flex-col mt-10 w-full text-base max-md:max-w-full">
        <div className="flex flex-col w-full max-md:max-w-full">
          <input
            type="email"
            placeholder="請輸入您的電郵"
            className="flex-1 shrink gap-2 self-stretch p-3 w-full whitespace-nowrap bg-white rounded-lg border border-purple-800 border-solid text-blue-950 max-md:max-w-full"
            aria-label="請輸入您的電郵"
          />
          <div className="flex flex-wrap gap-2 items-center p-3 mt-6 w-full whitespace-nowrap bg-white rounded-lg border border-purple-800 border-solid min-h-[48px] text-blue-950 max-md:max-w-full">
            <input
              type="password"
              placeholder="請輸入您的密碼"
              className="grow shrink self-stretch my-auto w-[551px] max-md:max-w-full"
              aria-label="請輸入您的密碼"
            />
            <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/bb5c1f4c37e82c1f14fd50340f47db923c83c5c63b64121c37037c6036c26d84?placeholderIfAbsent=true&apiKey=5bc2a3668e784135b048483cd2966401" alt="" className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square" />
          </div>
          <div className="flex flex-wrap gap-6 justify-center mt-6 w-full text-sm max-md:max-w-full">
            <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/84310d686f290e242940e88b02af6489e5c43de1ad7cd72e2e66ca15daf72c6a?placeholderIfAbsent=true&apiKey=5bc2a3668e784135b048483cd2966401" alt="" className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square" />
            <p data-layername="byClickingSignUpYoureConfirmingThatYouAgreeWithOurTermsAndConditions" className="self-stretch my-auto">
              點擊註冊即表示您同意我們的條款與細則
            </p>
            <div data-layername="agreement" className="flex flex-1 shrink gap-2 items-center self-start text-purple-800 bg-white rounded basis-0"></div>
            <div data-layername="forgotPassword" className="flex gap-2 items-center h-full font-medium whitespace-nowrap bg-white rounded min-w-[240px] text-blue-950 w-[580px] max-md:max-w-full"></div>
          </div>
        </div>
        <div className="flex flex-col mt-10 w-full whitespace-nowrap max-md:max-w-full">
          <button type="submit" data-layername="button01" className="gap-2 self-stretch px-8 py-3 w-full text-white bg-purple-800 border border-purple-800 border-solid rounded-[500px] max-md:px-5 max-md:max-w-full">
            登入
          </button>
          <div className="flex flex-wrap gap-2 items-center mt-4 w-full text-indigo-300 max-md:max-w-full">
            <div className="grow shrink self-stretch my-auto h-px border border-solid border-slate-300 min-w-[240px] w-[287px]"></div>
            <span data-layername="or" className="self-stretch my-auto">或</span>
            <div className="grow shrink self-stretch my-auto h-px border border-solid border-slate-300 min-w-[240px] w-[287px]"></div>
          </div>
          <button type="button" data-layername="button02" className="gap-2 self-stretch px-8 py-3 mt-4 w-full text-purple-800 border border-purple-800 border-solid rounded-[500px] max-md:px-5 max-md:max-w-full">
            註冊
          </button>
        </div>
      </form>
    </div>
  );
}

export default SignInForm;

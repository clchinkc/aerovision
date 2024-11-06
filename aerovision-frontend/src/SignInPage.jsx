import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Header from './components/Header';
import SignInForm from './components/SignInForm';
import ImageSlider from './components/ImageSlider';

function SignInPage({ onSignInSuccess }) {
  const navigate = useNavigate();

  const handleSignIn = async (credentials) => {
    // TODO: Implement actual authentication
    // For now, just simulate successful sign in
    onSignInSuccess();
    navigate('/upload');
  };

  return (
    <main className="flex overflow-hidden flex-col bg-white max-sm:hidden">
      <Navbar />
      <Header />
      <section className="z-10 mt-0 -mb-1 w-full max-md:pr-5 max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col">
          <div className="flex flex-col w-full max-md:ml-0 max-md:w-full">
            <div className="flex overflow-hidden flex-col px-7 pt-16 pb-28 mr-0 w-full bg-white min-h-[695px] max-md:px-5 max-md:pb-24 max-md:max-w-full max-sm:hidden">
              <div className="flex flex-wrap gap-10 justify-center items-start max-w-full w-[1312px]">
                <SignInForm onSubmit={handleSignIn} />
                <ImageSlider />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default SignInPage;

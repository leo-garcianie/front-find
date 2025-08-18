import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';

import Navbar from '../components/Navbar';
import BgGradient from '../components/BgGradient';
import Loading from '../components/Loading';
import CircularPercentage from '../components/charts/CircularPercentage';

import { getRecommendations } from '../api';

const Results = () => {
  const navigate = useNavigate();
  const [recommendations, setRecommendations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedAnswers = localStorage.getItem('surveyAnswers');

    if (!storedAnswers) {
      navigate('/survey');
      return;
    }

    let answers;

    try {
      answers = JSON.parse(storedAnswers);
    } catch (error) {
      console.error('Error at parse surveyAnswers:', error);
      navigate('/survey');
      return;
    }

    const converted = {
      answers: { ...answers },
    };

    const fetchResults = async () => {
      try {
        const results = await getRecommendations(converted);
        const obj =
          typeof results.data === 'string'
            ? JSON.parse(results.data)
            : results.data;
        setRecommendations(obj);
      } catch (error) {
        console.error('Error fetching recommendations:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResults();
  }, [navigate]);

  const handleViewDetails = (id) => {
    navigate(`/details/${id}`);
  };

  const handleRestartSurvey = () => {
    navigate('/survey');
  };

  if (isLoading) {
    return <Loading />;
  }
  return (
    <main className="flex flex-col items-center justify-center w-full min-h-screen bg-[#060F0E]">
      <Navbar />
      <BgGradient />

      {/* Content */}
      <div className="w-full px-8 mt-24 mb-8">
        {/* Title */}
        <div className="w-full mb-8 text-center">
          <p className="mx-auto px-12 text-2xl md:text-3xl lg:text-4xl font-bold text-white">
            Here’re your top 3 frameworks
          </p>
        </div>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] items-center max-w-screen-lg mx-auto gap-4">
          {recommendations.data.frameworks
            .slice(0, 3)
            .map((framework, index) => (
              <div key={framework.id}>
                <div className="flex flex-col justify-center px-8 py-6 bg-white/4 border border-[#999999]/40 rounded-4xl">
                  <div className="flex flex-row items-center justify-center mb-3 gap-3">
                    <img
                      src={framework.img}
                      alt="Logo"
                      className="size-10 md:size-12 drop-shadow-[0_0_8px_rgba(115,233,188,0.3)]"
                    />
                    <h2 className="font-bold text-lg md:text-xl">
                      {framework.name}
                    </h2>
                  </div>

                  <span className="text-xs md:text-sm text-white/70 capitalize">
                    Level: {framework.required_js_experience}
                  </span>

                  <div className="flex flex-col justify-center items-center my-5">
                    <CircularPercentage percentage={framework.accuracy} />
                    <div className="text-xl lg:text-2xl font-bold mt-1">
                      {framework.accuracy}%
                    </div>
                  </div>

                  <button
                    className="secondary-btn"
                    onClick={() => handleViewDetails(framework.id)}
                  >
                    Details
                  </button>
                </div>

                <div className="justify-self-center mt-3 text-2xl md:text-3xl lg:text-4xl font-bold">
                  {index + 1}
                </div>
              </div>
            ))}
        </div>

        {/* Buttons */}
        <div className="flex justify-center mt-8">
          <button className="primary-btn" onClick={handleRestartSurvey}>
            Restart survey
          </button>
        </div>
      </div>
    </main>
  );
};

export default Results;

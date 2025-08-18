import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { Link, FileText } from "lucide-react";

import Loading from "../components/Loading";
import BgGradient from "../components/BgGradient";
import Navbar from "../components/Navbar";
import CompatibilityChart from "../components/charts/CompatibilityChart";
import IntegrationsBool from "../components/charts/IntegrationsBool";

import { getFramework } from "../api";

const Details = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [framework, setFramework] = useState(null);

  useEffect(() => {
    const fetchFramework = async () => {
      try {
        const framework = await getFramework(Number(params.id));
        setFramework(framework.data.framework);
      } catch (error) {
        console.error("Error fetching framework:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFramework();
  }, [params.id, navigate]);

  const handleRestartSurvey = () => {
    navigate("/survey");
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <main className="flex flex-col items-center justify-center relative w-full min-h-screen bg-[#060F0E]">
      <Navbar />
      <BgGradient />

      <div className="grid grid-cols-1 lg:grid-cols-3 lg:grid-rows-2 items-center justify-center max-w-6xl mx-auto mt-20 p-4 gap-4">
        {/* 1 */}
        <div className="flex flex-col lg:flex-row items-center justify-center lg:col-span-3 grid-details">
          <div className="flex flex-row items-center justify-center w-3/12 gap-4">
            <img
              src={framework.img}
              alt={framework.name}
              className="size-10 md:size-12 lg:size-14 rounded-full drop-shadow-[0_0_8px_rgba(115,233,188,0.3)]"
            />
            <span className="text-2xl md:text-3xl lg:text-4xl font-bold">
              {framework.name}
            </span>
          </div>
          <div className="flex flex-col items-center w-9/12 px-5 py-5 gap-2 text-sm md:text-base">
            <div className="flex gap-4">
              <div className="capitalize">
                • Experience Level: {framework.recommended_experience_level}
              </div>
              <div className="capitalize">
                • Required JS Experience: {framework.required_js_experience}
              </div>
            </div>
            <div className="flex gap-4">
              <div className="capitalize">
                • Learning curve: {framework.learning_curve * 2}/10
              </div>
              <div className="capitalize">
                • Seo support: {framework.seo_support * 2}/10
              </div>
            </div>
          </div>
        </div>

        {/* 2 */}
        <div className="flex flex-col items-center justify-center lg:col-span-2 grid-details">
          <div className="mb-2 text-sm md:text-base">Compatibility</div>
          <CompatibilityChart
            lan={framework.project_compatibility.landing_page * 2}
            blog={framework.project_compatibility.blog * 2}
            spa={framework.project_compatibility.spa * 2}
            mpa={framework.project_compatibility.mpa * 2}
            dash={framework.project_compatibility.dashboard * 2}
            ecom={framework.project_compatibility.ecommerce * 2}
          />
        </div>

        {/* 3 */}
        <div className="flex flex-col grid-details gap-2 justify-center items-center w-full h-fit text-base md:text-xl">
          <div>• Performance: {framework.performance * 2}/10</div>
          <div>• Scalability: {framework.scalability * 2}/10</div>
          <div>• Maintainability: {framework.ease_of_maintenance * 2}/10</div>
        </div>

        {/* 4 */}
        <div className="flex flex-col items-center justify-center grid-details">
          <div className="mb-3 text-sm md:text-base">Integrations</div>

          <div className="flex flex-col w-full gap-1">
            <div className="flex flex-row items-center justify-center w-full gap-2">
              <div className="w-full text-sm md:text-base">Rest API</div>
              <div className="w-full justify-center items-center">
                <IntegrationsBool bool={framework.integrations.rest_api} />
              </div>
            </div>
            <div className="flex flex-row items-center justify-center w-full gap-2">
              <div className="w-full text-sm md:text-base">Real Time</div>
              <div className="w-full justify-center items-center">
                <IntegrationsBool bool={framework.integrations.real_time} />
              </div>
            </div>
            <div className="flex flex-row items-center justify-center w-full gap-2">
              <div className="w-full text-sm md:text-base">Authentication</div>
              <div className="w-full justify-center items-center">
                <IntegrationsBool
                  bool={framework.integrations.authentication}
                />
              </div>
            </div>
            <div className="flex flex-row items-center justify-center w-full gap-2">
              <div className="w-full text-sm md:text-base">Standalone</div>
              <div className="w-full justify-center items-center">
                <IntegrationsBool bool={framework.integrations.standalone} />
              </div>
            </div>
          </div>
        </div>

        {/* 5 */}
        <div className="flex flex-col items-center justify-center grid-details">
          <a
            href={framework.documentation_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-lg md:text-xl underline text-[#E6FF79]"
          >
            <Link className="size-5 md:size-6" />
            Visit Docs
          </a>
        </div>

        {/* 6 */}
        <div className="flex flex-col items-center justify-center grid-details">
          <button
            className="flex flex-col items-center p-2 gap-1 primary-btn text-base md:text-lg"
            onClick={handleRestartSurvey}
          >
            Restart Survey
          </button>
        </div>
      </div>
    </main>
  );
};

export default Details;

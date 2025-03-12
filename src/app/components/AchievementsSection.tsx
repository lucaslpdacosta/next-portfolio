"use client";
import CountUp from "react-countup";

type Achievement = {
  metric: string;
  value: string;
  prefix?: string;
  postfix?: string;
};

const achievementsList: Achievement[] = [
  {
    metric: "Repositórios",
    value: "44",
  },
  {
    metric: "Commits anuais",
    value: "44",
  },
  {
    prefix: "+",
    metric: "Linhas de código anuais",
    value: "3000",
  },
  {
    metric: "Anos desenvolvendo",
    value: "5",
  },
];

const AchievementsSection = () => {
  return (
    <div className="py-8 px-4 sm:py-12 xl:py-8 xl:px-12">
      <div className="sm:border-[#33353F] sm:border rounded-md py-8 px-8 flex flex-col sm:flex-row items-center justify-between grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 sm:gap-4 border border-[#33353F] max-w-screen-xl mx-auto">
        {achievementsList.map((achievement, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center mx-4 my-4 sm:my-0"
          >
            <h2 className="text-white text-4xl font-bold flex flex-row text-center">
              {achievement.prefix && <span>{achievement.prefix}</span>}
              <CountUp
                start={0}
                end={parseInt(achievement.value.replace(",", ""))}
                duration={2.5}
                separator=","
                className="text-white text-3xl font-bold"
              />
              {achievement.postfix && <span>{achievement.postfix}</span>}
            </h2>
            <p className="text-[#ADB7BE] text-base">{achievement.metric}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AchievementsSection;
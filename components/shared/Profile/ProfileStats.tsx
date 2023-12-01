import React from "react";

const ProfileStats = () => {
  return (
    <div className="mb-8">
      <h2 className="h2-bold text-dark100_light900 mb-6">Stats</h2>

      <div className="background-light900_dark200 w-full flex justify-between p-4 text-dark100_light900">
        <StatsCard title="Gold" value="100" />
        <StatsCard title="Silver" value="100" />
        <StatsCard title="Bronze" value="100" />
        <StatsCard title="Posts" value="100" />
      </div>
    </div>
  );
};

export default ProfileStats;

const StatsCard = (params: any) => {
  const { title, value } = params;

  return (
    <>
      <div className="flex flex-col">
        <p className="small-regular">{title}</p>
        <p className="h3-bold">{value}</p>
      </div>
    </>
  );
};

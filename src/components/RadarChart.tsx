import React from 'react';
import { Radar } from 'react-chartjs-2';

import { User } from '../../types';
import { getDataForRadarChart } from '../helpers';

const options = {
  title: {
    display: false,
  },
  scale: {
    ticks: {
      display: false,
      max: 1,
      min: 0,
      beginAtZero: true,
      steps: 3,
    },
  },
  legend: {
    display: false,
  },
};

export default function RadarChart({ user }: { user: User }) {
  return (
    <Radar
      data={getDataForRadarChart({ user })}
      options={options}
      width={100}
      height={100}
    />
  );
}

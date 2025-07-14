interface ProgressBarProps {
  percent: number;
  stepInfo: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ percent, stepInfo }) => {
  return (
    <div>
      <div className="w-full h-2 bg-primary-100 px-5 rounded">
        <div
          className="h-2 bg-primary-500 rounded"
          style={{ width: `${percent}%` }}
        />
      </div>
      <div className="text-sm text-gray-600 text-right px-4 py-1 font-karla">
        {stepInfo}
      </div>
    </div>
  );
};

export default ProgressBar;

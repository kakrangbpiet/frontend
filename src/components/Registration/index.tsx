import HorizontalLinearStepper from './Stepper';



const Registration = ({packageId, packageTitle}: {packageId: string, packageTitle: string}) => {
  return (
    <div className="lato-font py-2">
      <div className="px-4 container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
        <HorizontalLinearStepper packageId={packageId} packageTitle={packageTitle} />
      </div>
    </div>
  );
};

export default Registration;

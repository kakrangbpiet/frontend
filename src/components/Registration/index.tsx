import HorizontalLinearStepper from './Stepper';



const Registration = ({packageId, packageTitle}: {packageId: string, packageTitle: string}) => {
  return (
    <div className="lato-font ">
        <HorizontalLinearStepper packageId={packageId} packageTitle={packageTitle} />
    </div>
  );
};

export default Registration;

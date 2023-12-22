const MainComponent: React.FC = () => {
    return (
      <div>
        {KYCForm[0].digital.map(screen => (
          <div key={screen.screen}>
            <h2>{screen.screen}</h2>
            {screen.fields.map(field => (
              <div key={field.name}>
                {renderField(field)}
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  };
  
  export default MainComponent;
  
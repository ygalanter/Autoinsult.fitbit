function mySettings(props) {
  return (
    <Page>
      <Section
        title={<Text bold align="center">Autoinsult Settings</Text>}>
      
        <Select
          label={`Select insult type`}
          settingsKey="insulttype"
          options={[
            {name:"Arabian", value:"0"},
            {name:"Shakespearean", value:"1"},
            {name:"Mediterranean", value:"2"},
            {name:"Modern", value:"3"}
          ]}
        />
        
     </Section>
    </Page>
  );
}

registerSettingsPage(mySettings);
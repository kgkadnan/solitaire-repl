// const handleSubmit = (event:any) => {
//     event.preventDefault();

//     // Validate each section
//     let allValid = true;
//     const newErrors = { online: { sections: {} } };

//     Object.keys(formState.online.sections).forEach(sectionId => {
//       const sectionErrors = validateSection(formState.online.sections[sectionId]);
//       newErrors.online.sections[sectionId] = sectionErrors;

//       if (Object.keys(sectionErrors).length > 0) {
//         allValid = false;
//       }
//     });

//     if (!allValid) {
//       // Update your form error state
//       setFormErrors(newErrors);
//       return;
//     }

//     // Proceed with form submission as data is valid
//     // Submit logic...
//   };

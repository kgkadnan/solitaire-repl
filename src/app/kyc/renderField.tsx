const renderField = (field: any) => {
    switch (field.type) {
      case fieldType.FLOATING_INPUT:
        return "null";
      case fieldType.CHECKBOX:
        return null;
      default:
        return null;
    }
  };
  
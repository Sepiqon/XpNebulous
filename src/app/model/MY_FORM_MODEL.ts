import {
  DynamicFormModel,
  DynamicCheckboxModel,
  DynamicInputModel,
  DynamicRadioGroupModel,
  DynamicFormGroupModel,
  DynamicFormArrayModel
} from "@ng-dynamic-forms/core";

export const MY_FORM_MODEL: DynamicFormModel = [
  new DynamicFormArrayModel({

    id: "myFormArray",
    initialCount: 5,
    groupFactory: () => {
      return [
        new DynamicFormGroupModel({

          id: "address",
          legend: "Address",
          label: "test",

          group: [
            new DynamicInputModel({

              id: "street",
              label: "street"
            }),
            new DynamicInputModel({

              id: "myInput",
              label: "Zip Code"
            })
          ]
        })
      ];
    }
  })
];

export const preferences = [
  {
    id: 1,
    title: 'Electrical: System',
    params: [
      {
        title: 'Grounding Electrode Conductor - valid options (GEC/EGC Combined, GEC&EGC separated)',
        name: 'grounding_electrode_conductor',
        placeholder: 'Select Grounding Electrode Conductor',
        options: [
          {
            label: 'GEC/EGC Combined',
            value: 'GEC/EGC Combined',
          },
          {
            label: 'GEC&EGC separated',
            value: 'GEC&EGC separated',
          },
        ],
      },
    ],
  },
  {
    id: 2,
    title: 'Electrical: Balance of System',
    params: [
      {
        title: 'AC Disconnect Brand Name - valid options (Square D, Eaton, Cuttler Hummer, Siemens, General Electrci)',
        name: 'ac_disconnect_brand_name',
        placeholder: 'Select AC Disconnect Brand Name',
        options: [
          {
            label: 'Square D',
            value: 'Square D',
          },
          {
            label: 'Eaton',
            value: 'Eaton',
          },
          {
            label: 'Cuttler Hummer',
            value: 'Cuttler Hummer',
          },
          {
            label: 'Siemens',
            value: 'Siemens',
          },
          {
            label: 'General Electrci',
            value: 'General Electrci',
          },
        ],
      },
    ],
  },
  {
    id: 3,
    title: 'Electrical: Wire table',
    params: [
      {
        title: 'DC Conductor Material - valid options (Copper, Aluminium)',
        name: 'dc_conductor_material',
        placeholder: 'Select DC Conductor Material',
        options: [
          {
            label: 'Copper',
            value: 'Copper',
          },
          {
            label: 'Aluminium',
            value: 'Aluminium',
          },
        ],
      },
      {
        title: 'AC Conductor Material - valid options (Copper, Aluminium)',
        name: 'ac_conductor_material',
        placeholder: 'Select AC Conductor Material',
        options: [
          {
            label: 'Copper',
            value: 'Copper',
          },
          {
            label: 'Aluminium',
            value: 'Aluminium',
          },
        ],
      },
      {
        title: 'Minimum Conductor Size - valid options (12AWG, 10AWG, 8AWG, 6AWG)',
        name: 'minimum_conductor_size',
        placeholder: 'Select Minimum Conductor Size',
        options: [
          {
            label: '12AWG',
            value: '12AWG',
          },
          {
            label: '10AWG',
            value: '10AWG',
          },
          {
            label: '8AWG',
            value: '8AWG',
          },
          {
            label: '6AWG',
            value: '6AWG',
          },
        ],
      },
      {
        title: 'Minimum EGC Size - valid options (12AWG, 10AWG, 8AWG, 6AWG)',
        name: 'minimum_egc_size',
        placeholder: 'Select Minimum EGC Size',
        options: [
          {
            label: '12AWG',
            value: '12AWG',
          },
          {
            label: '10AWG',
            value: '10AWG',
          },
          {
            label: '8AWG',
            value: '8AWG',
          },
          {
            label: '6AWG',
            value: '6AWG',
          },
        ],
      },
      {
        title: 'DC Conduit Type - valid options (EMT, FMC, LFNC, LFMC, RMC, PVC-40, PVC-80)',
        name: 'dc_conduit_type',
        placeholder: 'Select DC Conduit Type',
        options: [
          {
            label: 'EMT',
            value: 'EMT',
          },
          {
            label: 'FMC',
            value: 'FMC',
          },
          {
            label: 'LFNC',
            value: 'LFNC',
          },
          {
            label: 'LFMC',
            value: 'LFMC',
          },
          {
            label: 'RMC',
            value: 'RMC',
          },
          {
            label: 'PVC-40',
            value: 'PVC-40',
          },
          {
            label: 'PVC-80',
            value: 'PVC-80',
          },
        ],
      },
      {
        title: 'AC Conduit Type - valid options (EMT, FMC, LFNC, LFMC, RMC, PVC-40, PVC-80)',
        name: 'ac_conduit_type',
        placeholder: 'Select AC Conduit Type',
        options: [
          {
            label: 'EMT',
            value: 'EMT',
          },
          {
            label: 'FMC',
            value: 'FMC',
          },
          {
            label: 'LFNC',
            value: 'LFNC',
          },
          {
            label: 'LFMC',
            value: 'LFMC',
          },
          {
            label: 'RMC',
            value: 'RMC',
          },
          {
            label: 'PVC-40',
            value: 'PVC-40',
          },
          {
            label: 'PVC-80',
            value: 'PVC-80',
          },
        ],
      },
      {
        title: 'Min Conduit Size - valid options (1/2", 3/4")',
        name: 'min_conduit_size',
        placeholder: 'Select Min Conduit Size',
        options: [
          {
            label: '1/2"',
            value: '1/2',
          },
          {
            label: '3/4"',
            value: '3/4',
          },
        ],
      },
      {
        title: 'OCPD rating - valid options (multiple of 5, multiple of 10)',
        name: 'ocpd_rating',
        placeholder: 'Select OCPD rating',
        options: [
          {
            label: 'multiple of 5',
            value: 'multiple of 5',
          },
          {
            label: 'multiple of 10',
            value: 'multiple of 10',
          },
        ],
      },
      {
        title: 'Minimum OCPD Rating - valid options (15A, 20A)',
        name: 'minimum_ocpd_rating',
        placeholder: 'Select Minimum OCPD Rating',
        options: [
          {
            label: '15A',
            value: '15A',
          },
          {
            label: '20A',
            value: '20A',
          },
        ],
      },
      {
        title: 'Conduit Fill Percentage - (2 chars numeric)',
        name: 'conduit_fill_percentage',
        placeholder: 'Input Conduit Fill Percentage',
      },
      {
        title: 'Voltage Drop View - valid options (None, With VD, Advanced VD)',
        name: 'voltage_drop_view',
        placeholder: 'Select Voltage Drop View',
        options: [
          {
            label: 'None',
            value: 'None',
          },
          {
            label: 'With VD',
            value: 'With VD',
          },
          {
            label: 'Advanced VD',
            value: 'Advanced VD',
          },
        ],
      },
      {
        title: 'Neutral View - valid options (Combined with Conductor, As a Separate Column)',
        name: 'neutral_view',
        placeholder: 'Select Neutral View',
        options: [
          {
            label: 'Combined with Conductor',
            value: 'Combined with Conductor',
          },
          {
            label: 'As a Separate Column',
            value: 'As a Separate Column',
          },
        ],
      },
      {
        title: 'EGC Calculation Method - valid options (Same as conductor, Per NEC 250.122)',
        name: 'egc_calculation_method',
        placeholder: 'Select EGC Calculation Method',
        options: [
          {
            label: 'Same as conductor',
            value: 'Same as conductor',
          },
          {
            label: 'Per NEC 250.122',
            value: 'Per NEC 250.122',
          },
        ],
      },
      {
        title: 'Neutral Calculation Method - valid options (Same as conductor, Same as EGC)',
        name: 'neutral_calculation_method',
        placeholder: 'Select Neutral Calculation Method',
        options: [
          {
            label: 'Same as conductor',
            value: 'Same as conductor',
          },
          {
            label: 'Same as EGC',
            value: 'Same as EGC',
          },
        ],
      },
    ],
  },
  {
    id: 4,
    title: 'Electrical: Electrical tabels',
    params: [
      {
        title: 'Bill of Materials Requirement - valid options (Y, N)',
        name: 'bill_of_materials_requirement',
        placeholder: 'Select Bill of Materials Requirement',
        options: [
          {
            label: 'Yes',
            value: 'Yes',
          },
          {
            label: 'No',
            value: 'No',
          },
        ],
      },
    ],
  },
  {
    id: 5,
    title: 'Electrical: Placards',
    params: [
      {
        title: 'Equipment Elevation Requirement - valid options (Y, N)',
        name: 'equipment_elevation_requirement',
        placeholder: 'Select Equipment Elevation Requirement',
        options: [
          {
            label: 'Yes',
            value: 'Yes',
          },
          {
            label: 'No',
            value: 'No',
          },
        ],
      },
      {
        title: 'House Placard Requirement - valid options (Y, N)',
        name: 'house_placard_requirement',
        placeholder: 'Select House Placard Requirement',
        options: [
          {
            label: 'Yes',
            value: 'Yes',
          },
          {
            label: 'No',
            value: 'No',
          },
        ],
      },
    ],
  },
];

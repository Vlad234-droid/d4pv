export const preferences = [
  {
    id: 1,
    title: 'Electrical: System',
    params: [
      {
        title: 'Grounding Electrode Conductor - valid options (GEC/EGC Combined, GEC&EGC separated)',
        name: 'grounding_electrode_conductor',
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
      },
      {
        title: 'AC Conductor Material - valid options (Copper, Aluminium)',
        name: 'ac_conductor_material',
      },
      {
        title: 'Minimum Conductor Size - valid options (12AWG, 10AWG, 8AWG, 6AWG)',
        name: 'minimum_conductor_size',
      },
      {
        title: 'Minimum EGC Size - valid options (12AWG, 10AWG, 8AWG, 6AWG)',
        name: 'minimum_egc_size',
      },
      {
        title: 'DC Conduit Type - valid options (EMT, FMC, LFNC, LFMC, RMC, PVC-40, PVC-80)',
        name: 'dc_conduit_type',
      },
      {
        title: 'AC Conduit Type - valid options (EMT, FMC, LFNC, LFMC, RMC, PVC-40, PVC-80)',
        name: 'ac_conduit_type',
      },
      {
        title: 'Min Conduit Size - valid options (1/2", 3/4")',
        name: 'min_conduit_size',
      },
      {
        title: 'OCPD rating - valid options (multiple of 5, multiple of 10)',
        name: 'ocpd_rating',
      },
      {
        title: 'Minimum OCPD Rating - valid options (15A, 20A)',
        name: 'minimum_ocpd_rating',
      },
      {
        title: 'Conduit Fill Percentage - (2 chars numeric)',
        name: 'conduit_fill_percentage',
      },
      {
        title: 'Voltage Drop View - valid options (None, With VD, Advanced VD)',
        name: 'voltage_drop_view',
      },
      {
        title: 'Neutral View - valid options (Combined with Conductor, As a Separate Column)',
        name: 'neutral_view',
      },
      {
        title: 'EGC Calculation Method - valid options (Same as conductor, Per NEC 250.122)',
        name: 'egc_calculation_method',
      },
      {
        title: 'Neutral Calculation Method - valid options (Same as conductor, Same as EGC)',
        name: 'neutral_calculation_method',
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
      },
      {
        title: 'House Placard Requirement - valid options (Y, N)',
        name: 'house_placard_requirement',
      },
    ],
  },
];

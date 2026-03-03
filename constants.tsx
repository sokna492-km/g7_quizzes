import { Subject, Chapter } from './types';

// Complete the SUBJECTS_CONFIG object to satisfy the Record<Subject, ...> type.
export const SUBJECTS_CONFIG: Record<Subject, { icon: string; chapters: Chapter[] }> = {
  [Subject.Mathematics]: {
    icon: '📐',
    chapters: [
      { id: 'math1', title: 'មេរៀនទី ១៖ ចំនួនគត់', summary: 'Whole numbers, place values, and basic arithmetic operations (addition, subtraction, multiplication, division).' },
      { id: 'math2', title: 'មេរៀនទី ២៖ តួចែកនិងពហុគុណ', summary: 'Divisors, multiples, prime numbers, Greatest Common Divisor (GCD), and Least Common Multiple (LCM).' },
      { id: 'math3', title: 'មេរៀនទី ៣៖ ចំនួនគត់រ៉ឺឡាទី', summary: 'Signed numbers (integers), positive and negative values, number lines, and operations with signed numbers.' },
      { id: 'math4', title: 'មេរៀនទី ៤៖ ប្រភាគ', summary: 'Definition of fractions, equivalent fractions, simplification, and operations (addition, subtraction, multiplication, division) with fractions.' },
      { id: 'math5', title: 'មេរៀនទី ៥៖ ចំនួនទសភាគ', summary: 'Decimal numbers, relationship between fractions and decimals, place values, and arithmetic operations with decimals.' },
      { id: 'math6', title: 'មេរៀនទី​ ៦៖ ភាគរយ', summary: 'Percentages, converting fractions/decimals to percentages, and practical percentage problems (discounts, interest).' },
      { id: 'math7', title: 'មេរៀនទី​ ៧៖ រង្វាស់រង្វាល់', summary: 'Metric system units for length, mass, and capacity. Converting units and solving measurement problems.' },
      { id: 'math8', title: 'មេរៀនទី ៨៖ កន្សោមពីជគណិត', summary: 'Introduction to variables, algebraic expressions, simplifying expressions, and substituting values.' },
      { id: 'math9', title: 'មេរៀនទី ៩៖ សមីកាដឺក្រេទីមួយមានមួយអញ្ញាត', summary: 'First-degree equations with one unknown (x). Methods to solve linear equations and word problems.' },
      { id: 'math10', title: 'មេរៀនទី ១០៖ វិសមភាព', summary: 'Introduction to inequalities, symbols (<, >, ≤, ≥), and basic properties of inequalities.' },
      { id: 'math11', title: 'មេរៀនទី ១១៖ ផលធៀបនិងសមាមាត្រ', summary: 'Ratios, rates, and proportions. Solving for unknown terms in proportions and scale drawings.' },
      { id: 'math12', title: 'មេរៀនទី ១ ២៖ សញ្ញាណដំបូងនៃរូបធរណីមាត្រ', summary: 'Basic geometric concepts: points, lines, segments, rays, and planes.' },
      { id: 'math13', title: 'មេរៀនទី ១៣៖ មុំ', summary: 'Types of angles (acute, right, obtuse, straight), measuring angles with a protractor, and angle relationships.' },
      { id: 'math14', title: 'មេរៀនទី ១៤៖ បន្ទាត់ស្រប បន្ទាត់នៅតែ', summary: 'Parallel lines, perpendicular lines, transversals, and properties of corresponding/alternate angles.' },
      { id: 'math15', title: 'មេរៀនទី ១៥៖ រូបធរណីមាត្រដែលមានវិមាត្រពីរ', summary: 'Triangles, quadrilaterals (rectangles, squares, parallelograms), and their classification.' },
      { id: 'math16', title: 'មេរៀនទី ១៦៖ បរិមាត្រនិងផ្ទៃក្រឡាពហុកោណ', summary: 'Calculating the perimeter and area of squares, rectangles, triangles, and composite polygons.' },
      { id: 'math17', title: 'មេរៀនទី ១៧៖ រង្វង់', summary: 'Parts of a circle (center, radius, diameter, chord), circumference, and area of circles.' },
      { id: 'math18', title: 'មេរៀនទី ១៨៖ មាឌនិងផ្ទៃក្រឡាខាងនៃសូលីត', summary: 'Surface area and volume of basic 3D shapes like rectangular prisms (cuboids).' },
      { id: 'math19', title: 'មេរៀនទី ១៩៖ ភាពឆ្លុះ', summary: 'Line symmetry, point symmetry, and identifying symmetrical figures.' },
      { id: 'math20', title: 'មេរៀនទី ២០៖ ប្រូបាប', summary: 'Basic probability, outcomes, events, and calculating the chance of simple events.' },
      { id: 'math21', title: 'មេរៀនទី ២១៖ ក្រាបសសរ', summary: 'Data collection, interpreting and drawing bar graphs to represent information.' },
      { id: 'math22', title: 'មេរៀនទី ២ ២៖ ក្រាបផ្លិត', summary: 'Representing data using pie charts, calculating angles for sectors, and interpretation.' }
    ]
  },
  [Subject.Physics]: {
    icon: '⚡',
    chapters: [
      { id: 'phys_c1_l1', title: 'ជំពូកទី១-មេរៀនទី១៖ សីតុណ្ហភាព', summary: 'Definition of temperature, temperature scales (Celsius, Kelvin), and using thermometers.' },
      { id: 'phys_c1_l2', title: 'ជំពូកទី១-មេរៀនទី២៖ ការរីកនៃអង្គធាតុ', summary: 'Thermal expansion of solids, liquids, and gases. Applications and effects of expansion in daily life.' },
      { id: 'phys_c1_l3', title: 'ជំពូកទី១-មេរៀនទី៣៖ បរិមាណកម្តៅ', summary: 'Heat as energy, specific heat capacity, and calculating heat transfer using Q = mcΔT.' },
      { id: 'phys_c2_l1', title: 'ជំពូកទី២-មេរៀនទី១៖ ការចម្លងកម្ដៅ', summary: 'Conduction in solids, conductors vs insulators, and mechanisms of molecular vibration.' },
      { id: 'phys_c2_l2', title: 'ជំពូកទី២-មេរៀនទី២៖ ចរន្តវិលវល់', summary: 'Convection in fluids (liquids and gases), natural convection, and heating systems.' },
      { id: 'phys_c2_l3', title: 'ជំពូកទី២-មេរៀនទី៣៖ ការបញ្ចេញរស្មី', summary: 'Radiation of thermal energy, infrared waves, and absorption/emission by different surfaces.' },
      { id: 'phys_c3_l1', title: 'ជំពូកទី៣-មេរៀនទី១៖ បន្ទុកអគ្គិសនី', summary: 'Types of electric charges, law of attraction and repulsion, and static electricity.' },
      { id: 'phys_c3_l2', title: 'ជំពូកទី៣-មេរៀនទី២៖ ចរន្តអគ្គិសនី', summary: 'Flow of electrons, measuring current in Amperes, and using an ammeter.' },
      { id: 'phys_c3_l3', title: 'ជំពូកទី៣-មេរៀនទី៣៖ តង់ស្យុងអគ្គិសនី', summary: 'Electric potential difference, measuring voltage in Volts, and using a voltmeter.' },
      { id: 'phys_c3_l4', title: 'ជំពូកទី៣-មេរៀនទី៤៖ រេស៊ីស្តង់អគ្គិសនី', summary: 'Ohm\'s Law, resistance, factors affecting resistance, and resistors in a circuit.' },
      { id: 'phys_c3_l5', title: 'ជំពូកទី៣-មេរៀនទី៥៖ ប្រភពចរន្តអគ្គិសនី', summary: 'Batteries, generators, solar cells, and converting various energies to electricity.' },
      { id: 'phys_c3_l6', title: 'ជំពូកទី៣-មេរៀនទី៦៖ សៀគ្វីអគ្គិសនី', summary: 'Series and parallel circuits, symbols, closed vs open circuits, and circuit safety.' },
      { id: 'phys_c4_l1', title: 'ជំពូកទី៤-មេរៀនទី១៖ សម្ពាធនៃអង្គធាតុរឹង', summary: 'Definition of pressure (P = F/A), units (Pascal), and increasing/decreasing pressure.' },
      { id: 'phys_c4_l2', title: 'ជំពូកទី៤-មេរៀនទី២៖ ការបញ្ចូនសម្ពាធក្នុងសន្ទនីយ', summary: 'Pascal\'s Principle, hydraulic systems, and transmission of pressure in liquids and gases.' },
      { id: 'phys_c4_l3', title: 'ជំពូកទី៤-មេរៀនទី៣៖ រង្វាស់សម្ពាធនៃអង្គធាតុរាវ', summary: 'Hydrostatic pressure, depth relationship, and measuring liquid pressure.' },
      { id: 'phys_c4_l4', title: 'ជំពូកទី៤-មេរៀនទី៤៖ សម្ពាធបរិយាកាស', summary: 'Air pressure, barometers, altitude effects, and the importance of atmospheric pressure.' }
    ]
  },
  [Subject.Biology]: {
    icon: '🌱',
    chapters: [
      { id: 'bio_l1', title: 'មេរៀនទី១៖ រុក្ខជាតិមានផ្កា', summary: 'មាតិកា៖ ផ្នែកផ្សេងៗនៃផ្កា (ស្រទាប់ផ្កា ស្រទាប់ម្នាស់ ប៉េស៊ីល កេសរញី កេសរឈ្មោល) និងមុខងារនីមួយៗក្នុងការបន្តពូជ។' },
      { id: 'bio_l2', title: 'មេរៀនទី២៖ ដំណឹកនាំក្នុងរុក្ខជាតិមានផ្កា', summary: 'មាតិកា៖ ប្រព័ន្ធដឹកនាំក្នុងរុក្ខជាតិ បំពង់ស៊ីឡែម (ដឹកនាំទឹក និងអំបិលខនិជ) បំពង់ផ្លូអែម (ដឹកនាំអាហារ) និងការបំភាយទឹកតាមស្លឹក។' },
      { id: 'bio_l3', title: 'មេរៀនទី៣៖ រូបផ្តុំកោសិកា', summary: 'មាតិកា៖ និយមន័យកោសិកា ភ្នាសកោសិកា ស៊ីតូប្លាស និងណ្វាយូ។ តួនាទីរបស់កោសិកាក្នុងការទ្រទ្រង់ជីវិត។' },
      { id: 'bio_l4', title: 'មេរៀនទី៤៖ រូបផ្តុំសារពាង្គកាយមនុស្ស', summary: 'មាតិកា៖ លំដាប់ថ្នាក់នៃរូបផ្តុំ (កោសិកា -> ជាលិកា -> សរីរាង្គ -> ប្រព័ន្ធសរីរាង្គ -> សារពាង្គកាយ)។' },
      { id: 'bio_l5', title: 'មេរៀនទី៥៖ កោសិការុក្ខជាតិ', summary: 'មាតិកា៖ លក្ខណៈរូបនៃកោសិការុក្ខជាតិ ភាពខុសគ្នារវាងកោសិការុក្ខជាតិ និងសត្វ (ជញ្ជាំងកោសិកា ក្លរ៉ូប្លាស វ៉ាគុយអូលធំ)។' },
      { id: 'bio_l6', title: 'មេរៀនទី៦៖ ផ្នែកផ្សេងៗនៃប្រដាប់រំលាយអាហារ', summary: 'មាតិកា៖ បំពង់រំលាយអាហារ (មាត់ បំពង់អាហារ ក្រពះ ពោះវៀន) និងសរីរាង្គជំនួយ (ថ្លើម លំពែង ក្រពេញទឹកមាត់)។' },
      { id: 'bio_l7', title: 'មេរៀនទី៧៖ ការរំលាយអាហារ', summary: 'មាតិកា៖ ដំណាក់កាលរំលាយអាហារ (មេកានិច និងគីមី) អង់ស៊ីមរំលាយអាហារ និងការបឺតស្រូបជីវជាតិចូលក្នុងឈាម។' },
      { id: 'bio_l8', title: 'មេរៀនទី៨៖ ថ្នាំជក់ និងបារី', summary: 'មាតិកា៖ សមាសធាតុពុលក្នុងបារី (នីកូទីន កំរ៉ែបារី កាបូនម៉ូណូអុកស៊ីត) និងផលប៉ះពាល់យ៉ាងធ្ងន់ធ្ងរដល់ប្រព័ន្ធដង្ហើម និងបេះដូង។' }
    ]
  },
  [Subject.Chemistry]: {
    icon: '🧪',
    chapters: [
      { id: 'chem_c1_l1', title: 'ជំពូក១៖ រូបធាតុ និង ចំណែកថ្នាក់ - មេរៀនទី១៖ រូបធាតុ', summary: 'មាតិកា៖ ១. រូបធាតុ ២. លក្ខណៈរូបនៃរូបធាតុ (២.១ វត្ថុរឹង, ២.២ វត្ថុរាវ, ២.៣ ឧស្ម័ន) ៣. បម្រើបម្រាស់រូបធាតុ។ រៀនពីមាឌ រាង និងការកំណត់សម្គាល់រូបធាតុក្នុងជីវភាពប្រចាំថ្ងៃ។' },
      { id: 'chem_c1_l2', title: 'ជំពូក១៖ រូបធាតុ និង ចំណែកថ្នាក់ - មេរៀនទី២៖ ចំណែកថ្នាក់រូបធាតុ', summary: 'មាតិកា៖ ១. និយមន័យ ២. លក្ខណៈនៃសម្ភារៈ ៣. ចំណែកថ្នាក់នៃរូបធាតុ (៣.១ ចំណែកថ្នាក់តាមលក្ខណៈជាក់លាក់, ៣.២ ចំណែកថ្នាក់តាមភាពរូប)។' },
      { id: 'chem_c2_l1', title: 'ជំពូក២៖ បំលែងភាពរូប - មេរៀនទី១៖ បំលែងភាពរូបនៃរូបធាតុ', summary: 'មាតិកា៖ ១. បំលែងពីភាពរូបមួយទៅភាពរូបមួយផ្សេងទៀត (១.១ ការរលាយ, ១.២ កំណក, ១.៣ រំពុះ, ១.៤ កំណញើស, ១.៥ រំហើរ, ១.៦ រំហួត) ២. បំលែងភាពរូបនៃទឹក។' },
      { id: 'chem_c2_l2', title: 'ជំពូក២៖ បំលែងភាពរូប - មេរៀនទី២៖ កត្តានៃបំលែងរូបធាតុ', summary: 'មាតិកា៖ ១. សង្កេត ២. បំលែងដោយកម្ដៅ ៣. បំលែងដោយពន្លឺ ៤. បំលែងដោយអគ្គិសនី ៥. បំលែងដោយល្បាយ ៦. ប្រតិកម្មគីមី (ការបង្កើតសារធាតុថ្មី)។' },
      { id: 'chem_c3_l1', title: 'ជំពូក៣៖ ខ្យល់ - មេរៀនទី១៖ ខ្យល់', summary: 'មាតិកា៖ ១. ខ្យល់ ២. លក្ខណៈខ្យល់ (ផ្ទេរបាន, មានម៉ាស, បង្រួមបាន, ពង្រាវបាន) ៣. សមាសភាពខ្យល់ ៤. អត្តសញ្ញាណកម្មឧស្ម័ន (អុកស៊ីសែន ជួយឱ្យឆេះ, កាបូនឌីអុកស៊ីត ធ្វើឱ្យទឹកកំបោរល្អក់) ៥. ភាវៈមានជីវីតនិងខ្យល់។' },
      { id: 'chem_c3_l2', title: 'ជំពូក៣៖ ខ្យល់ - មេរៀនទី២៖ ធាតុកង្វក់ខ្យល់', summary: 'មាតិកា៖ ១. កង្វក់ខ្យល់ ២. ធាតុពុល (SO2, CO, Lead, NOx, CFCs) ៣. ឥទ្ធិពលមនុស្ស (៣.១ កំណើនកម្ដៅ, ៣.២ ភ្លៀងអាស៊ីត, ៣.២ ការស្តើងស្រទាប់អូសូន, ៣.៤ ការសំអាតខ្យល់) ៤. ផលនៃផ្ទះកញ្ចក់។' }
    ]
  },
  [Subject.KhmerLiterature]: {
    icon: '📖',
    chapters: [
      // CHAPTER 1: សេចក្តីស្រឡាញ់
      { id: 'khmer_c1_l1', title: 'ជំពូកទី ១៖ សេចក្តីស្រឡាញ់ - មេរៀនទី ១៖ សេចក្តីស្រឡាញ់', summary: 'មាតិកា៖ សេចក្តីស្រឡាញ់ជាប្រភពនៃសេចក្តីរីករាយនិងសន្តិភាព។ សេចក្តីស្រឡាញ់ផ្តើមចេញពីការស្រឡាញ់ខ្លួនឯង គ្រួសារ មិត្តភក្តិ ជនរួមជាតិ ទឹកដី និងប្រជាជាតិ។ ប្រទេសជាតិរុងរឿងនិងរីកចម្រើន ដោយសារប្រទេសមានសន្តិភាព ពលរដ្ឋមានស្មារតីស្រឡាញ់ជាតិ រួមចំណែកការពារនិងអភិវឌ្ឍជាតិ។' },
      { id: 'khmer_c1_l2', title: 'ជំពូកទី ១៖ សេចក្តីស្រឡាញ់ - មេរៀនទី ២៖ ព្រេងកថា', summary: 'មាតិកា៖ ១. និយមន័យ៖ ព្រេងកថាជារឿងប្រឌិតដែលដំណើររឿងទាក់ទងនិងជំនឿ ទំនៀមទម្លាប់ប្រពៃណី ឈ្មោះមនុស្ស ប្រវត្តិភូមិ ស្រុក ទីកន្លែង ឬប្រវត្តិសាស្ត្ររបស់ប្រទេស។ ២. លក្ខណៈសម្គាល់៖ ដំណើររឿងច្រើនទាក់ទងនឹងប្រវត្តិសាស្ត្រ ទីកន្លែងនៅក្នុងប្រទេស ជំនឿ ទំនៀមទម្លាប់ ប្រពៃណីរបស់ប្រជាជន។ តួអង្គជាមនុស្សធម្មតា ឬជាបុគ្គលអស្ចារ្យនៅក្នុងប្រវត្តិសាស្ត្រ។' },
      { id: 'khmer_c1_l3', title: 'ជំពូកទី ១៖ សេចក្តីស្រឡាញ់ - មេរៀនទី ៣៖ ចំណុចរាយ', summary: 'មាតិកា៖ ចំណុចរាយ ឬ ចុចរាយប្រើសម្រាប់៖ ([...]) ដាក់នៅខាងដើម ឬខាងចុងកថាខណ្ឌ ដើម្បីបញ្ជាក់ថាមានសម្តី ឬ សេចក្តីផ្សេងទៀត ប៉ុន្តែគេមិនលើកយកមកប្រាប់។ (...) ដាក់នៅខាងចុង បង្ហាញសម្តី ឬសេចក្តីដែលនៅមានបន្តទៀត ឬដាក់នៅកន្លែងចន្លោះដែលត្រូវបំពេញ ឬបង្គ្រប់ និងដាក់មិនចំពោះទីកន្លែងណាមួយទេ ដោយគេចង់បកស្រាយការភ័យខ្លាច តក់ស្លុត ញាប់ញ័រ រន្ធត់...' },
      { id: 'khmer_c1_l4', title: 'ជំពូកទី ១៖ សេចក្តីស្រឡាញ់ - មេរៀនទី ៤៖ តម្លៃអប់រំ', summary: 'មាតិកា៖ តម្លៃអប់រំជាគំនិតទូន្មាន ប្រៀនប្រដៅរបស់អ្នកនិពន្ធ តាមរយៈស្នាដៃរបស់ខ្លួន។ អ្នកនិពន្ធមានវិធីអប់រំប្លែកៗដូចជា បង្ហាញអំពើល្អឱ្យអ្នកអាន អ្នកសិក្សាយកតម្រាប់តាម ឬយកជាបទពិសោធ ឬបង្ហាញអំពើអាក្រក់ឱ្យអ្នកអាន អ្នកសិក្សាស្អប់ខ្ពើម ចៀសវាង លះបង់។' },
      { id: 'khmer_c1_l5', title: 'ជំពូកទី ១៖ សេចក្តីស្រឡាញ់ - មេរៀនទី ៥៖ ល្បះបញ្ជាក់', summary: 'មាតិកា៖ ១. និយមន័យ៖ ល្បះបញ្ជាក់ គឺល្បះប្រាប់ព័ត៌មាន ឬព្រឹត្តិការណ៍ផ្សេងៗ។ ល្បះបញ្ជាក់ បញ្ចប់ដោយសញ្ញាខណ្ឌ។ ២. លំហាត់៖ ការកំណត់សម្គាល់ល្បះបញ្ជាក់ក្នុងចំណោមល្បះសំណួរ ល្បះបញ្ជា និងល្បះឧទាន។' },
      { id: 'khmer_c1_l6', title: 'ជំពូកទី ១៖ សេចក្តីស្រឡាញ់ - មេរៀនទី ៦៖ សំណេរអត្ថបទព័ត៌មាន ពណ៌នាព្រឹត្តិការណ៍', summary: 'មាតិកា៖ ១. និយមន័យ៖ សំណេរនេះតម្រូវឱ្យអ្នកសរសេររៀបរាប់ឡើងវិញពីព្រឹត្តិការណ៍ រឿងហេតុ ឬហេតុការណ៍ ដែលកើតឡើងក្នុងរឿងដែលបានអានរួច ឬព្រឹត្តិការណ៍ដែលបានជួបជាក់ស្តែង។ ២. សម្គាល់៖ ការដាក់ចំណងជើង, ប្រាប់ប្រភព, មូលហេតុ, ភាពសាំញ៉ាំ, ដំណោះស្រាយ, លទ្ធផល និងចំណាប់អារម្មណ៍។' },
      { id: 'khmer_c1_l7', title: 'ជំពូកទី ១៖ សេចក្តីស្រឡាញ់ - មេរៀនទី ៧៖ ទង់ជាតិខ្មែរ', summary: 'មាតិកា៖ ទង់ជាតិខ្មែរជានិមិត្តរូបនៃព្រលឹងនិងដួងវិញ្ញាណក្ខន្ធរបស់ប្រជាជនខ្មែរយើងគ្រប់ជំនាន់។ មានពណ៌ខៀវ (ទឹកដី សម្បត្តិធម្មជាតិ វប្បធម៌), ពណ៌ក្រហម (សេចក្តីអង់អាចក្លាហាន), និងរូបប្រាសាទកំពូលត្រីសូល៍ពណ៌ស (សម្បត្តិវប្បធម៌ កេតនភណ្ឌជាតិ)។' },

      // CHAPTER 2: ការជួយគ្នាទៅវិញទៅមក
      { id: 'khmer_c2_l1', title: 'ជំពូកទី ២៖ ការជួយគ្នាទៅវិញទៅមក - មេរៀនទី ១៖ ទេវកថា', summary: 'មាតិកា៖ ទេវកថា គឺជារឿងរ៉ាវស្តីពីការយល់ដឹងដំបូងរបស់មនុស្ស ពីប្រភពកំណើតនៃអាទិទេព ទេវៈ អ្នកតា មនុស្ស សត្វ រុក្ខជាតិ បាតុភូតធម្មជាតិនិងប្រភពពិធីគោរពបូជាផ្សេងៗ។' },
      { id: 'khmer_c2_l2', title: 'ជំពូកទី ២៖ ការជួយគ្នាទៅវិញទៅមក - មេរៀនទី ២៖ ល្បះសំណួរ', summary: 'មាតិកា៖ ល្បះសំណួរ ជាល្បះសម្រាប់សួររកដំណឹង ឬព័ត៌មានផ្សេងៗដែលគេចង់ដឹង ហើយល្បះនេះបញ្ចប់ដោយសញ្ញាសួរ “?”។ ប្រភេទល្បះសំណួរ៖ ល្បះសំណួរបញ្ជាក់, ប្រើសព្វនាមសំណួរ, គុណនាមសំណួរ, គុណកិរិយាសំណួរ, ល្បះសំណួរបែបដណ្តឹង, និងល្បះសំណួរស្រប/មិនស្រប។' },
      { id: 'khmer_c2_l3', title: 'ជំពូកទី ២៖ ការជួយគ្នាទៅវិញទៅមក - មេរៀនទី ៣៖ តួអង្គឯក តួអង្គរង', summary: 'មាតិកា៖ ១. តួអង្គឯក៖ មានសកម្មភាពច្រើនប្រឈមនឹងបញ្ហាស្មុគស្មាញក្នុងដំណើររឿង។ ២. តួអង្គរង៖ ធ្វើសកម្មភាពដោយអន្លើៗ ជួយបំពេញដំណើររឿងនិងលក្ខណសម្បត្តិឱ្យតួអង្គឯក។ ៣. តួអង្គបន្ទាប់បន្សំ៖ ធ្វើសកម្មភាពហែហមដំណើររឿងឱ្យមានភាពរលូន។' },
      { id: 'khmer_c2_l4', title: 'ជំពូកទី ២៖ ការជួយគ្នាទៅវិញទៅមក - មេរៀនទី ៤៖ សញ្ញាសម្ព័ន្ធ វង់ក្រចក និងតង្កៀប', summary: 'មាតិកា៖ ការប្រើប្រាស់សញ្ញាវង់ក្រចក (...) និងតង្កៀប [...] ក្នុងភាសាខ្មែរ៖ បញ្ជាក់ន័យ, ប្រាប់ប្រភពអ្នកនិពន្ធ, ប្រាប់ប្រភពអត្ថបទដកស្រង់, និងការប្រើប្រាស់ក្នុងមុខវិជ្ជាវិទ្យាសាស្ត្រ។' },
      { id: 'khmer_c2_l5', title: 'ជំពូកទី ២៖ ការជួយគ្នាទៅវិញទៅមក - មេរៀនទី ៥៖ ការស្តាប់', summary: 'មាតិកា៖ ការត្រងត្រាប់រាល់សកម្មភាពវិជ្ជមាន និងការកត់ចំណាំសេចក្តីសំខាន់ៗក្នុងអត្ថបទ។ ការស្តាប់រឿង "ស្រូវ" ដើម្បីស្វែងយល់គំនិតអប់រំ និងកត់ចំណាំសេចក្តីលម្អិត។' },
      { id: 'khmer_c2_l6', title: 'ជំពូកទី ២៖ ការជួយគ្នាទៅវិញទៅមក - មេរៀនទី ៦៖ សំណេរអត្ថបទព័ត៌មាន ពណ៌នាព្រឹត្តិការណ៍', summary: 'មាតិកា៖ ព្រឹត្តិការណ៍ជារឿងរ៉ាវផ្សេងៗខុសពីសកម្មភាពធម្មតា។ សំណេរនេះតម្រូវឱ្យអ្នកសរសេរលើកយកហេតុការណ៍ ឬរឿងរ៉ាវដែលខ្លួនជួបប្រទះមករៀបរាប់បង្ហាញអ្នកដទៃឱ្យបានដឹង។' },

      // CHAPTER 3: កេរដំណែលរបស់ជាតិ
      { id: 'khmer_c3_l1', title: 'ជំពូកទី ៣៖ កេរដំណែលរបស់ជាតិ - មេរៀនទី ១៖ កាព្យមាត្រ ឬរង្វាស់កាព្យ', summary: 'មាតិកា៖ កាព្យមាត្រ ឬរង្វាស់កាព្យ ជាការរាប់ចំនួនព្យាង្គក្នុងឃ្លានិងចំនួនឃ្លាក្នុងវគ្គរបស់កំណាព្យ។ ឧទាហរណ៍៖ បទកាកគតិ (៧ឃ្លាក្នុង១វគ្គ, ៤ព្យាង្គក្នុង១ឃ្លា), បទពាក្យ៧ (៤ឃ្លាក្នុង១វគ្គ, ៧ព្យាង្គក្នុង១ឃ្លា)។' },
      { id: 'khmer_c3_l2', title: 'ជំពូកទី ៣៖ កេរដំណែលរបស់ជាតិ - មេរៀនទី ២៖ ចំណាប់ចួន ផ្ទួន រណ្តំ', summary: 'មាតិកា៖ ១. ចំណាប់ចួន៖ ព្យាង្គដែលមានសូរស្រៈ ឬព្យញ្ជនៈប្រកបដូចគ្នា។ ២. ផ្ទួន៖ ការប្រើពាក្យដដែលៗដើម្បីសង្កត់ន័យ ឬបង្កើតសញ្ចេតនា។ ៣. រណ្តំ៖ ការប្រើព្យញ្ជនៈ ឬស្រៈតែមួយច្រើនដងក្នុងឃ្លា (រណ្តំព្យញ្ជនៈ)។' },
      { id: 'khmer_c3_l3', title: 'ជំពូកទី ៣៖ កេរដំណែលរបស់ជាតិ - មេរៀនទី ៣៖ សព្វនាមចង្អុល', summary: 'មាតិកា៖ សព្វនាមចង្អុលជាពាក្យសម្រាប់ចង្អុលបង្ហាញអ្វីមួយដែលនៅចំពោះមុខ។ សម្រាប់ទីជិត៖ នេះ, អានេះ, អ្នកនេះ។ សម្រាប់ទីឆ្ងាយ៖ នោះ, អានោះ, អ្នកនោះ។' },
      { id: 'khmer_c3_l4', title: 'ជំពូកទី ៣៖ កេរដំណែលរបស់ជាតិ - មេរៀនទី ៤៖ និមិត្តរូប', summary: 'មាតិកា៖ និមិត្តរូបជាសញ្ញា ឬរូបតំណាងដើម្បីសម្គាល់គំនិត ឬទំនាក់ទំនង។ ឧទាហរណ៍៖ ពណ៌ក្រហម (វីរភាព), ពណ៌ខ្មៅ (ទុក្ខព្រួយ), ពណ៌ស (សេចក្តីបរិសុទ្ធ)។' },
      { id: 'khmer_c3_l5', title: 'ជំពូកទី ៣៖ កេរដំណែលរបស់ជាតិ - មេរៀនទី ៥៖ របាំត្រុដិ', summary: 'មាតិកា៖ របាំត្រុដិជារបាំប្រជាប្រិយលេងក្នុងឱកាសចូលឆ្នាំខ្មែរ ដើម្បីប្រសិទ្ធីសព្ទសាធុការពរ។ "ត្រុដិ" មកពីសំស្ក្រឹត ប្រែថា ផ្តាច់ (ផ្តាច់ឆ្នាំចាស់ចូលឆ្នាំថ្មី)។ គោលបំណង៖ រក្សាកេរមត៌កសិល្បៈបុរាណ និងជួយជាសាធារណប្រយោជន៍។' },
      { id: 'khmer_c3_l6', title: 'ជំពូកទី ៣៖ កេរដំណែលរបស់ជាតិ - មេរៀនទី ៦៖ ការស្តាប់អត្ថបទ "ច្បាប់ស្រី"', summary: 'មាតិកា៖ គំនិតសំខាន់បង្កប់តម្រូវឱ្យអ្នកអានពិចារណា និងទាញសេចក្តីសន្និដ្ឋានរួមដែលគ្របដណ្តប់អត្ថបទទាំងមូល។ ការស្តាប់អត្ថបទដកស្រង់ក្នុង "ច្បាប់ស្រី" និងការស្វែងយល់តម្លៃអប់រំ។' },
      { id: 'khmer_c3_l7', title: 'ជំពូកទី ៣៖ កេរដំណែលរបស់ជាតិ - មេរៀនទី ៧៖ ការតែងកំណាព្យ', summary: 'មាតិកា៖ ការតែងកំណាព្យបទពំនោល (៣ឃ្លាក្នុង១វគ្គ, ៦-៤-៦ ព្យាង្គ) និងបទពាក្យ៧។ លំដាប់គំនិតត្រូវទាក់ទងគ្នា និងគោរពក្បួនចាប់ចុងចួនឱ្យបានត្រឹមត្រូវ។' },
      { id: 'khmer_c3_l8', title: 'ជំពូកទី ៣៖ កេរដំណែលរបស់ជាតិ - មេរៀនទី ៨៖ ប្រាសាទបាយ័ន និងប្រាសាទសិលាខ្មែរ', summary: 'មាតិកា៖ ប្រាសាទសិលាជាស្នាដៃបុព្វបុរសខ្មែរដែលមានក្បូរក្បាច់រចនាល្អឯក។ ប្រាសាទអង្គរវត្តមានកំពូលប្រាំដើម្បីឧទ្ទិសថ្វាយព្រះវិស្ណុ។ ប្រាសាទបាយ័នបង្ហាញពីចម្លាក់យោធា សកម្មភាពទ័ពខ្មែរ ល្បែងកីឡា និងសេដ្ឋកិច្ចសម័យមហានគរ។' },

      // CHAPTER 4: សេចក្តីថ្លៃថ្នូរ
      { id: 'khmer_c4_l1', title: 'ជំពូកទី ៤៖ សេចក្តីថ្លៃថ្នូរ - មេរៀនទី ១៖ នាមករណ៍ ឬករណនាម', summary: 'មាតិកា៖ នាមករណ៍ ឬករណនាម ជានាមសម្តែងសភាព ឬសកម្មភាព។ ជាទូទៅប្រើពាក្យ "ការ" ឬ "សេចក្តី" នៅពីមុខ។ ឧទាហរណ៍៖ សេចក្តីថ្លៃថ្នូរ, ការប្រព្រឹត្ត, ការសង្កេត, សេចក្តីស្រឡាញ់។' },
      { id: 'khmer_c4_l2', title: 'ជំពូកទី ៤៖ សេចក្តីថ្លៃថ្នូរ - មេរៀនទី ២៖ ការប្រើប្រាស់រាជសព្ទ និងសង្ឃសព្ទ', summary: 'មាតិកា៖ រាជសព្ទ (សម្រាប់ប្រើជាមួយព្រះរាជា) និងសង្ឃសព្ទ (សម្រាប់ប្រើជាមួយព្រះសង្ឃ)។ ឧទាហរណ៍៖ ថ្វាយ-ប្រគេន (ឱ្យ), កេសា (សក់), ត្រាស់-សង្ឃដីកា (និយាយ), ទ្រង់ផ្ទំ (ដេក)។' },
      { id: 'khmer_c4_l3', title: 'ជំពូកទី ៤៖ សេចក្តីថ្លៃថ្នូរ - មេរៀនទី ៣៖ នាមការក៍ ឬការកនាម', summary: 'មាតិកា៖ នាមការក៍ ឬការកនាម ជានាមសម្តែងអ្នកធ្វើអំពើ ឬអ្នកមានសភាពលក្ខណៈបែបណាមួយ។ ឧទាហរណ៍៖ អ្នកចម្ការ, កសិករ, ទស្សនិកជន, សិល្បករ, អ្នករាំ។' },
      { id: 'khmer_c4_l4', title: 'ជំពូកទី ៤៖ សេចក្តីថ្លៃថ្នូរ - មេរៀនទី ៤៖ កាលអាកាស', summary: 'មាតិកា៖ កាលអាកាស គឺពេលវេលា និងទីកន្លែងដែលដំណើររឿងប្រព្រឹត្តទៅ។ ឧទាហរណ៍ពី "រឿងបុរស៣នាក់ឈ្លោះដណ្តើមដំណេកគ្នា"៖ កាល (រាត្រីមួយ), អាកាស (ផ្លូវកណ្តាលព្រៃ, ព្រះបរមរាជវាំង)។' },
      { id: 'khmer_c4_l5', title: 'ជំពូកទី ៤៖ សេចក្តីថ្លៃថ្នូរ - មេរៀនទី ៥៖ ការសម្តែងតួដោយប្រើសង្ឃសព្ទ', summary: 'មាតិកា៖ ការប្រើប្រាស់សង្ឃសព្ទក្នុងការសន្ទនាជាមួយព្រះសង្ឃ។ ពាក្យគួរសម៖ ខ្ញុំព្រះករុណា, ក្រាបថ្វាយបង្គំ, និមន្ត, ចម្រើនពរ, ញោម។' },
      { id: 'khmer_c4_l6', title: 'ជំពូកទី ៤៖ សេចក្តីថ្លៃថ្នូរ - មេរៀនទី ៦៖ សំណេរអត្ថបទដោយប្រើរាជសព្ទ', summary: 'មាតិកា៖ ការតែងអត្ថបទដោយប្រើរាជសព្ទឱ្យបានត្រឹមត្រូវ តាមលំដាប់លំដោយគំនិត និងអក្ខរាវិរុទ្ធ (ឧទាហរណ៍៖ ព្រះមហាក្សត្រយាងសាកសួរសុខទុក្ខប្រជាជន)។' },

      // CHAPTER 5: ពលរដ្ឋល្អ
      { id: 'khmer_c5_l1', title: 'ជំពូកទី ៥៖ ពលរដ្ឋល្អ - មេរៀនទី ១៖ យុវជនកម្ពុជា និងកាតព្វកិច្ចជាតិ', summary: 'មាតិកា៖ យុវជនជាកម្លាំងសំខាន់ក្នុងការកសាងជាតិ។ ត្រូវមានសេចក្តីស្មោះត្រង់ រក្សាសាមគ្គីភាព និងខិតខំបញ្ចេញសមត្ថភាពតាមជំនាញរៀងៗខ្លួន (កសិកម្ម ឧស្សាហកម្ម ការសិក្សា) ដើម្បីអភិវឌ្ឍសេដ្ឋកិច្ចជាតិ។' },
      { id: 'khmer_c5_l2', title: 'ជំពូកទី ៥៖ ពលរដ្ឋល្អ - មេរៀនទី ២៖ កិរិយាសុទ្ធ និងកិរិយាហេតុ', summary: 'មាតិកា៖ ១. កិរិយាសុទ្ធ៖ សម្តែងអំពើដែលប្រធានធ្វើផ្ទាល់ និងទទួលផលដោយខ្លួនឯង (ឧ. ខ្ញុំរៀន)។ ២. កិរិយាហេតុ៖ សម្តែងអំពើដែលប្រធានធ្វើឡើងគ្រាន់តែជាហេតុដើមចម (ឧ. គ្រូបង្រៀន)។' },
      { id: 'khmer_c5_l3', title: 'ជំពូកទី ៥៖ ពលរដ្ឋល្អ - មេរៀនទី ៣៖ សញ្ញាជើងក្អែក (+)', summary: 'មាតិកា៖ សញ្ញាជើងក្អែក (+) មាននាទីតភ្ជាប់ព្យញ្ជនៈ ស្រៈ ព្យាង្គ និងពាក្យដែលសរសេររំលង ឬប្រើដើម្បីទាញសំឡេងអក្សរឱ្យឡើងខ្ពស់ជាងប្រក្រតី។' },
      { id: 'khmer_c5_l4', title: 'ជំពូកទី ៥៖ ពលរដ្ឋល្អ - មេរៀនទី ៤៖ សន្ទនាតាមទូរស័ព្ទ', summary: 'មាតិកា៖ ការប្រើសម្តីសុភាពរាបសារ ច្បាស់លាស់ និងគោរពគ្នាក្នុងការសន្ទនាតាមទូរស័ព្ទ។ ត្រូវផ្តើមដោយគោលបំណងច្បាស់លាស់ និងបញ្ចប់ដោយពាក្យជម្រាបលា។' },
      { id: 'khmer_c5_l5', title: 'ជំពូកទី ៥៖ ពលរដ្ឋល្អ - មេរៀនទី ៥៖ ការស្តាប់រឿង "ខ្ញុំខុសហើយ"', summary: 'មាតិកា៖ ការយល់ដឹងពីឥរិយាបថដែលសមរម្យនៅទីសាធារណៈ និងការទទួលខុសត្រូវក្នុងនាមជាពលរដ្ឋល្អតាមរយៈការស្តាប់ និងកត់ចំណាំសេចក្តីលម្អិត។' },
      { id: 'khmer_c5_l6', title: 'ជំពូកទី ៥៖ ពលរដ្ឋល្អ - មេរៀនទី ៦៖ បំពេញទម្រង់បែបបទ', summary: 'មាតិកា៖ ការចេះបំពេញព័ត៌មានផ្ទាល់ខ្លួនក្នុងទម្រង់ផ្សេងៗ៖ អត្តសញ្ញាណប័ណ្ណសិស្ស, ពាក្យសុំចូលរៀន, សលាកប័ត្រព័ត៌មាន។ ត្រូវបំពេញឈ្មោះ ភេទ សញ្ជាតិ ទីកន្លែងកំណើត និងអាសយដ្ឋានឱ្យបានត្រឹមត្រូវ។' },

      // PLACEHOLDERS FOR CHAPTERS 6-10
      { id: 'khmer_c6_p', title: 'ជំពូកទី ៦៖ សេចក្ដីប្រាថ្នារបស់យើង - មេរៀនទី ១៖ (មេរៀនសាកល្បង)', summary: 'Placeholder for Chapter 6 content.' },
      { id: 'khmer_c7_p', title: 'ជំពូកទី ៧៖ តម្លៃនៃការងារ - មេរៀនទី ១៖ (មេរៀនសាកល្បង)', summary: 'Placeholder for Chapter 7 content.' },
      { id: 'khmer_c8_p', title: 'ជំពូកទី ៨៖ សេចក្តីព្យាយាម - មេរៀនទី ១៖ (មេរៀនសាកល្បង)', summary: 'Placeholder for Chapter 8 content.' },
      { id: 'khmer_c9_p', title: 'ជំពូកទី ៩៖ សេចក្តីសង្ឃឹម - មេរៀនទី ១៖ (មេរៀនសាកល្បង)', summary: 'Placeholder for Chapter 9 content.' },
      { id: 'khmer_c10_p', title: 'ជំពូកទី ១០៖ បំណងប្រាថ្នាដើម្បីជោគជ័យ - មេរៀនទី ១៖ (មេរៀនសាកល្បង)', summary: 'Placeholder for Chapter 10 content.' }
    ]
  },
  [Subject.MoralCivic]: {
    icon: '🤝',
    chapters: [
      { id: 'moral_c1_l1', title: 'ជំពូកទី១៖ យេនឌ័រ និងសិទ្ធិមនុស្ស - មេរៀនទី១៖ ភេទនិងយេនឌ័រ', summary: 'ការយល់ដឹងពីភាពខុសគ្នារវាងភេទ (ជីវសាស្ត្រ) និងយេនឌ័រ (តួនាទីសង្គម) និងការលើកកម្ពស់សិទ្ធិមនុស្ស។' },
      { id: 'moral_c1_l2', title: 'ជំពូកទី១៖ យេនឌ័រ និងសិទ្ធិមនុស្ស - មេរៀនទី២៖ ផ្នត់គំនិត', summary: 'ការសិក្សាអំពីផ្នត់គំនិតក្នុងសង្គម ការយល់ឃើញមិនត្រឹមត្រូវ និងឥទ្ធិពលរបស់វាទៅលើបុគ្គល។' },
      { id: 'moral_c1_l3', title: 'ជំពូកទី១៖ យេនឌ័រ និងសិទ្ធិមនុស្ស - មេរៀនទី៣៖ យេនឌ័រ និងផ្នត់គំនិត', summary: 'ទំនាក់ទំនងរវាងយេនឌ័រ និងផ្នត់គំនិត ការបែងចែកការងារ និងការរំពឹងទុករបស់សង្គមលើបុរសនិងស្រី។' },
      { id: 'moral_c1_l4', title: 'ជំពូកទី១៖ យេនឌ័រ និងសិទ្ធិមនុស្ស - មេរៀនទី៤៖ ការរើសអើងនិងបញ្ហាផ្លូវចិត្ត', summary: 'ផលប៉ះពាល់នៃការរើសអើងយេនឌ័រទៅលើសុខភាពផ្លូវចិត្ត និងការអភិវឌ្ទន៍ខ្លួនរបស់យុវជន។' },
      { id: 'moral_c1_l5', title: 'ជំពូកទី១៖ យេនឌ័រ និងសិទ្ធិមនុស្ស - មេរៀនទី៥៖ ការលុបបំបាត់ការរើសអើងចំពោះស្រី', summary: 'យុទ្ធសាស្ត្រនិងការយល់ដឹងដើម្បីបញ្ឈប់ការរើសអើងប្រឆាំងនឹងស្ត្រី និងកុមារីក្នុងសង្គមខ្មែរ។' },
      { id: 'moral_c1_l6', title: 'ជំពូកទី១៖ យេនឌ័រ និងសិទ្ធិមនុស្ស - មេរៀនទី៦៖ វិធានការធានាឲ្យមានសមភាពយេនឌ័រ', summary: 'ច្បាប់ និងគោលនយោបាយនានាដែលជួយជំរុញឲ្យមានសមភាពរវាងបុរសនិងស្រីក្នុងគ្រប់វិស័យ។' },
      { id: 'moral_c2_l1', title: 'ជំពូកទី២៖ មិត្តភាព - មេរៀនទី១៖ លក្ខណៈមិត្តល្អ', summary: 'ការកំណត់ស្គាល់មិត្តល្អតាមរយៈភាពស្មោះត្រង់ ការជួយយកអាសា និងការគោរពគ្នាទៅវិញទៅមក។' },
      { id: 'moral_c2_l2', title: 'ជំពូកទី២៖ មិត្តភាព - មេរៀនទី២៖ ការរក្សាមិត្តភាព', summary: 'វិធីសាស្ត្រក្នុងការថែរក្សាមិត្តភាពឲ្យបានយូរអង្វែង និងការដោះស្រាយវិវាទរវាងមិត្តភក្តិ។' },
      { id: 'moral_c2_l3', title: 'ជំពូកទី២៖ មិត្តភាព - មេរៀនទី៣៖ សារៈសំខាន់នៃមិត្តភាពល្អ', summary: 'តួនាទីរបស់មិត្តភាពក្នុងការជួយគាំទ្រផ្លូវចិត្ត និងការអភិវឌ្ឍន៍ចំណេះដឹងរបស់សិស្សានុសិស្ស។' },
      { id: 'moral_c3_l1', title: 'ជំពូកទី៣៖ គ្រួសារ - មេរៀនទី១៖ ប្រភេទនៃគ្រួសារ', summary: 'ការស្វែងយល់ពីគ្រួសារតូច (Nuclear) គ្រួសារធំ (Extended) និងតួនាទីរបស់សមាជិកគ្រួសារ។' },
      { id: 'moral_c3_l2', title: 'ជំពូកទី៣៖ គ្រួសារ - មេរៀនទី២៖ ប្រភពនៃសុភមង្គលគ្រួសារ', summary: 'កត្តាដែលធ្វើឲ្យគ្រួសារមានសុភមង្គល រួមមានការស្រឡាញ់ ការយោគយល់ និងការមានសេដ្ឋកិច្ចសមរម្យ។' },
      { id: 'moral_c3_l3', title: 'ជំពូកទី៣៖ គ្រួសារ - មេរៀនទី៣៖ ការកសាងសុភមង្គលគ្រួសារ', summary: 'សកម្មភាពប្រចាំថ្ងៃដែលជួយពង្រឹងចំណងគ្រួសារ និងការរួមចំណែករបស់កូនៗក្នុងគ្រួសារ។' },
      { id: 'moral_c4_l1', title: 'ជំពូកទី៤៖ ការរស់នៅជាមួយសហគមន៍ - មេរៀនទី១៖ ការបោះឆ្នោត', summary: 'គោលការណ៍គ្រឹះនៃការបោះឆ្នោតតាមបែបប្រជាធិបតេយ្យ និងសារៈសំខាន់នៃការជ្រើសរើសអ្នកដឹកនាំ។' },
      { id: 'moral_c4_l2', title: 'ជំពូកទី៤៖ ការរស់នៅជាមួយសហគមន៍ - មេរៀនទី២៖ តួនាទីនិងភារកិច្ចតំណាងសិស្ស', summary: 'ការទទួលខុសត្រូវរបស់ប្រធានថ្នាក់ ឬតំណាងសិស្សក្នុងការជួយសម្របសម្រួលការងារសាលា។' },
      { id: 'moral_c4_l3', title: 'ជំពូកទី៤៖ ការរស់នៅជាមួយសហគមន៍ - មេរៀនទី៣៖ ដំណើរការនៃការបោះឆ្នោត', summary: 'ជំហាននានាក្នុងការរៀបចំបោះឆ្នោត ចាប់ពីការចុះឈ្មោះ រហូតដល់ការប្រកាសលទ្ធផល។' },
      { id: 'moral_c4_l4', title: 'ជំពូកទី៤៖ ការរស់នៅជាមួយសហគមន៍ - មេរៀនទី៤៖ លក្ខខណ្ឌនៃការឈរឈ្មោះជាបេក្ខជន', summary: 'លក្ខណៈសម្បត្តិដែលបេក្ខជនត្រូវមានដើម្បីឈរឈ្មោះបោះឆ្នោតជាតំណាងសិស្ស។' },
      { id: 'moral_c4_l5', title: 'ជំពូកទី៤៖ ការរស់នៅជាមួយសហគមន៍ - មេរៀនទី៥៖ ការចូលរួមបោះឆ្នោត', summary: 'សិទ្ធិ និងកាតព្វកិច្ចរបស់សិស្សម្នាក់ៗក្នុងការចូលរួមបោះឆ្នោតដោយសេរី និងយុត្តិធម៌។' },
      { id: 'moral_c4_l6', title: 'ជំពូកទី៤៖ ការរស់នៅជាមួយសហគមន៍ - មេរៀនទី៦៖ គុណសម្បត្តិនៃអ្នកជាប់បោះឆ្នោត', summary: 'លក្ខណៈសម្បត្តិល្អៗដែលអ្នកដឹកនាំត្រូវមានដើម្បីបម្រើសហគមន៍ ឬសាលារៀនបានល្អ។' },
      { id: 'moral_c5_l1', title: 'ជំពូកទី៥៖ ការកំណត់គោលដៅសម្រាប់ជីវិត - មេរៀនទី១៖ ការជ្រើសរើសអាជីព', summary: 'ការស្វែងយល់ពីទេពកោសល្យផ្ទាល់ខ្លួន និងការផ្គូផ្គងជាមួយការងារដែលខ្លួនស្រឡាញ់។' },
      { id: 'moral_c5_l2', title: 'ជំពូកទី៥៖ ការកំណត់គោលដៅសម្រាប់ជីវិត - មេរៀនទី២៖ សារៈសំខាន់នៃការជ្រើសរើសអាជីព', summary: 'ហេតុអ្វីបានជាការកំណត់គោលដៅការងារតាំងពីក្មេងមានសារៈសំខាន់សម្រាប់ជោគជ័យក្នុងជីវិត។' },
      { id: 'moral_c5_l3', title: 'ជំពូកទី៥៖ ការកំណត់គោលដៅសម្រាប់ជីវិត - មេរៀនទី៣៖ ព័ត៌មានអំពីអាជីព', summary: 'ប្រភពព័ត៌មាននានាដែលជួយឲ្យសិស្សស្គាល់ពីទីផ្សារការងារ និងមុខជំនាញផ្សេងៗ។' },
      { id: 'moral_c6_l1', title: 'ជំពូកទី៦៖ ជំនឿសាសនា - មេរៀនទី១៖ ដើមកំណើតព្រះពុទ្ធសាសនា', summary: 'ប្រវត្តិសង្ខេបរបស់ព្រះពុទ្ធសមណគោតម និងការរីកដុះដាលនៃសាសនាព្រះពុទ្ធនៅកម្ពុជា។' },
      { id: 'moral_c6_l2', title: 'ជំពូកទី៦៖ ជំនឿសាសនា - មេរៀនទី២៖ ការអប់រំសំខាន់ៗរបស់សាសនាព្រះពុទ្ធ', summary: 'សីល៥ ធម៌អប់រំចិត្ត និងការរស់នៅដោយសន្តិភាពតាមគន្លងព្រះពុទ្ធសាសនា។' },
      { id: 'moral_c6_l3', title: 'ជំពូកទី៦៖ ជំនឿសាសនា - មេរៀនទី៣៖ ដើមកំណើតហិណ្ឌូសាសនា', summary: 'ប្រវត្តិ និងអាទិទេពសំខាន់ៗក្នុងហិណ្ឌូសាសនា (ព្រះព្រហ្ម ព្រះវិស្ណុ ព្រះសិវៈ)។' },
      { id: 'moral_c6_l4', title: 'ជំពូកទី៦៖ ជំនឿសាសនា - មេរៀនទី៤៖ ការអប់រំសំខាន់ៗក្នុងហិណ្ឌូសាសនា', summary: 'ទស្សនវិជ្ជា និងជំនឿផ្សេងៗក្នុងហិណ្ឌូសាសនាដែលជះឥទ្ធិពលដល់វប្បធម៌ខ្មែរ Tune។' }
    ]
  },
  [Subject.EarthScience]: {
    icon: '🌍',
    chapters: [
      { id: 'earth_l1', title: 'មេរៀនទី១៖ កំណកំណើតប្រព័ន្ធព្រះអាទិត្យ', summary: 'ការសិក្សាអំពីការកកើតប្រព័ន្ធព្រះអាទិត្យ ចេញពីពពកឧស្ម័ន និងធូលីក្នុងលំហ (Solar Nebula) និងកម្លាំងទំនាញ។' },
      { id: 'earth_l2', title: 'មេរៀនទី២៖ ផ្កាយពិសេសឬព្រះអាទិត្យ', summary: 'លក្ខណៈពិសេសរបស់ព្រះអាទិត្យ រចនាសម្ព័ន្ធ ថាមពលពន្លឺ និងកម្ដៅ និងសារៈសំាន់របស់វាចំពោះជីវិតលើផែនដី។' },
      { id: 'earth_l3', title: 'មេរៀនទី៣៖ ចលនារបស់ភព', summary: 'ចលនាគោចររបស់ភពជុំវិញព្រះអាទិត្យ ចលនារង្វិលជុំវិញខ្លួនឯង និងច្បាប់កែប្ល៊ែរ (Kepler\'s Laws) សង្ខេប។' },
      { id: 'earth_l4', title: 'មេរៀនទី៤៖ ភពសំខាន់ៗ', summary: 'ការសិក្សាពីភពទាំង ៨ ក្នុងប្រព័ន្ធព្រះអាទិត្យ បែងចែកជាភពសិលា (Terrestrial) និងភពឧស្ម័នយក្ស (Gas Giants) Tune Tune Tune។' },
      { id: 'earth_l5', title: 'មេរៀនទី៥៖ អាចម៍ផ្កាយ ផ្កាយដុះកន្ទុយ ផ្កាយព្រះគ្រោះ', summary: 'លក្ខណៈខុសគ្នារវាងអាចម៍ផ្កាយ (Asteroids) ផ្កាយដុះកន្ទុយ (Comets) និងផ្កាយព្រះគ្រោះតូចៗក្នុងលំហ Tune Tune Tune Tune Tune។' },
      { id: 'earth_l6', title: 'មេរៀនទី៦៖ ​ចលនារង្វិលរបស់ភពផែនដី', summary: 'ចលនារង្វិលជុំវិញខ្លួនឯងរបស់ផែនដី បាតុភូតថ្ងៃនិងយប់ និងឥទ្ធិពលនៃល្បឿនរង្វិល។' }
    ]
  },
  [Subject.Geography]: {
    icon: '🗺️',
    chapters: [
      { id: 'geo_l1', title: 'មេរៀនទី១៖ ការប្រើប្រាស់ផែនទី', summary: 'Basics of map reading, scales, symbols, and coordinates.' },
      { id: 'geo_l2', title: 'មេរៀនទី២៖ លក្ខណៈរូបនៃព្រះរាជាណាចក្រកម្ពុជា', summary: 'Physical features of Cambodia: mountains, plains, and coastlines.' },
      { id: 'geo_l3', title: 'មេរៀនទី៣៖ ប្រព័ន្ធទន្លេមេគង្គ និងបឹងទន្លេសាប', summary: 'The Mekong river system, Tonle Sap lake, and their economic importance.' }
    ]
  },
  [Subject.History]: {
    icon: '🗿',
    chapters: [
      { id: 'hist_l1', title: 'មេរៀនទី១៖ ប្រវត្តិសាស្ត្រ និងការស្រាវជ្រាវ', summary: 'The definition of history, primary and secondary sources, and why we study it.' },
      { id: 'hist_l2', title: 'មេរៀនទី២៖ បុរេប្រវត្តិសាស្ត្រនៅកម្ពុជា', summary: 'Pre-history of Cambodia, early human settlements, and archaeological findings.' },
      { id: 'hist_l3', title: 'មេរៀនទី៣៖ អាណាចក្រភ្នំ (ហ្វូណន)', summary: 'The history of Funan, its culture, economy, and foreign relations.' }
    ]
  },
  [Subject.English]: {
    icon: '🔤',
    chapters: [
      { id: 'eng_c1_u1', title: 'Chapter 1 - Unit 1: Meeting new friends', summary: 'Greeting people, introducing oneself, and learning basic English pronouns and "to be" verbs.' },
      { id: 'eng_c1_u2', title: 'Chapter 1 - Unit 2: Schools around the world', summary: 'Vocabulary for school supplies, describing classrooms, and talking about school systems globally.' },
      { id: 'eng_c1_u3', title: 'Chapter 1 - Unit 3: Why are you so naughty?', summary: 'Describing personality traits and behavior using simple adjectives and present continuous tense.' },
      { id: 'eng_c1_u4', title: 'Chapter 1 - Unit 4: I study English', summary: 'Talking about daily schedules, academic subjects, and using the simple present tense for routines.' },
      { id: 'eng_c1_u5', title: 'Chapter 1 - Unit 5: Study habits', summary: 'Learning adverbs of frequency (always, often, never) and discussing effective learning techniques.' },
      { id: 'eng_c1_u6', title: 'Chapter 1 - Unit 6: Talking with teachers', summary: 'Formal greetings, asking for help, and polite classroom expressions for students and teachers.' },
      { id: 'eng_c1_u7', title: 'Chapter 1 - Unit 7: Getting ready for school', summary: 'Vocabulary for clothes and morning routines. Focus on time management and preparation.' },
      { id: 'eng_c1_u8', title: 'Chapter 1 - Unit 8: Going to school', summary: 'Transportation methods, prepositions of place, and directions to get to school.' },
      { id: 'eng_c1_u9', title: 'Chapter 1 - Unit 9: After school', summary: 'Hobbies, extracurricular activities, and discussing what students do in their free time.' },
      { id: 'eng_c2_u10', title: 'Chapter 2 - Unit 10: My family', summary: 'Family tree vocabulary, describing relationships, and using possessive adjectives.' },
      { id: 'eng_c2_u11', title: 'Chapter 2 - Unit 11: I’m the coolest in my family', summary: 'Comparative and superlative adjectives. Describing similarities and differences between family members.' },
      { id: 'eng_c2_u12', title: 'Chapter 2 - Unit 12: Monsters', summary: 'Using creative vocabulary to describe appearance and parts of the body in a fun context.' },
      { id: 'eng_c2_u13', title: 'Chapter 2 - Unit 13: Guess what I’ve got!', summary: 'Practicing "have/has got" and vocabulary for personal possessions and items.' },
      { id: 'eng_c2_u14', title: 'Chapter 2 - Unit 14: How do you feel?', summary: 'Expressing emotions, physical health states, and simple medical vocabulary.' },
      { id: 'eng_c2_u15', title: 'Chapter 2 - Unit 15: What in the world are you wearing?', summary: 'Clothing names for different seasons and cultures. Practice with "wear" in present continuous.' },
      { id: 'eng_c2_u16', title: 'Chapter 2 - Unit 16: I can do it!', summary: 'Modal verb "can" to talk about ability and skills. Encouraging self-confidence.' },
      { id: 'eng_c2_u17', title: 'Chapter 2 - Unit 17: It’s my time!', summary: 'Reviewing telling time, schedules, and expressing future plans with "going to".' },
      { id: 'eng_c2_u18', title: 'Chapter 2 - Unit 18: I like my friends', summary: 'Describing qualities of good friends and using "like/dislike" with gerunds.' },
      { id: 'eng_c2_u19', title: 'Chapter 2 - Unit 19: Guesses, tricks and presents', summary: 'Practice with making predictions and describing gift-giving scenarios.' },
      { id: 'eng_c3_u20', title: 'Chapter 3 - Unit 20: Festivals, parties and trouble', summary: 'Vocabulary for celebrations, festivals in Cambodia, and talking about past events.' },
      { id: 'eng_c3_u21', title: 'Chapter 3 - Unit 21: A world of fun', summary: 'International holidays, fun parks, and expressing opinions about entertainment.' },
      { id: 'eng_c3_u22', title: 'Chapter 3 - Unit 22: Cambodian fact files', summary: 'Using factual language to describe Cambodia\'s landmarks, geography, and important figures.' },
      { id: 'eng_c3_u23', title: 'Chapter 3 - Unit 23: My cool house', summary: 'Rooms in a house, furniture vocabulary, and prepositions of location.' },
      { id: 'eng_c3_u24', title: 'Chapter 3 - Unit 24: Cool places in my town', summary: 'Public buildings, shops, and describing a local neighborhood.' },
      { id: 'eng_c3_u25', title: 'Chapter 3 - Unit 25: Do I have to?', summary: 'Modal verb "have to" for obligation and necessity at home and school.' },
      { id: 'eng_c3_u26', title: 'Chapter 3 - Unit 26: New babies', summary: 'Talking about birth, ages, and family life changes using simple past verbs.' },
      { id: 'eng_c3_u27', title: 'Chapter 3 - Unit 27: Yummy!', summary: 'Food vocabulary, counting vs. uncounting nouns, and ordering in a restaurant.' },
      { id: 'eng_c4_u28', title: 'Chapter 4 - Unit 28: The swinging 60s', summary: 'History through English: talking about the 1960s culture and past tense descriptions.' },
      { id: 'eng_c4_u29', title: 'Chapter 4 - Unit 29: When I was young', summary: 'Used to / Past simple for talking about childhood memories and historical changes.' },
      { id: 'eng_c4_u30', title: 'Chapter 4 - Unit 30: A long, long time ago', summary: 'Narrating stories and legends using sequencing words (first, next, then, finally).' },
      { id: 'eng_c4_u31', title: 'Chapter 4 - Unit 31: What happened?', summary: 'Asking questions about past events using "Who, What, Where, When, Why" in the past.' },
      { id: 'eng_c4_u32', title: 'Chapter 4 - Unit 32: Is that really real?', summary: 'Expressing doubt and belief. Describing mythical creatures and real science facts.' },
      { id: 'eng_c4_u33', title: 'Chapter 4 - Unit 33: More questions', summary: 'Summary of the Grade 7 English curriculum with a focus on question formation and review.' }
    ]
  },
  [Subject.Python]: {
    icon: '🐍',
    chapters: [
      { id: 'py_1', title: 'Beginner - Introduction to Python', summary: 'What Python is, installation, IDEs (VS Code, PyCharm, Jupyter), running Python scripts and interactive shell.' },
      { id: 'py_2', title: 'Beginner - Python Syntax Basics', summary: 'Indentation rules, comments, variables and naming conventions.' },
      { id: 'py_3', title: 'Beginner - Data Types', summary: 'Numbers (int, float, complex), strings, boolean, type conversion.' },
      { id: 'py_4', title: 'Beginner - Operators', summary: 'Arithmetic, comparison, logical, assignment, membership and identity operators.' },
      { id: 'py_5', title: 'Beginner - Input and Output', summary: 'print(), input(), formatting strings (f-strings).' },
      { id: 'py_6', title: 'Beginner - Control Flow', summary: 'if, elif, else, nested conditions.' },
      { id: 'py_7', title: 'Beginner - Loops', summary: 'for loop, while loop, break, continue, pass.' },
      { id: 'py_8', title: 'Intermediate - Data Structures', summary: 'Lists, tuples, sets, dictionaries.' },
      { id: 'py_9', title: 'Intermediate - List Comprehension', summary: 'Basic and advanced comprehension techniques.' },
      { id: 'py_10', title: 'Intermediate - Functions', summary: 'Defining functions, parameters and return values, default and keyword arguments, lambda functions.' },
      { id: 'py_11', title: 'Intermediate - Modules and Packages', summary: 'Importing modules, creating custom modules, standard libraries overview.' },
      { id: 'py_12', title: 'Intermediate - File Handling', summary: 'Reading files, writing files, working with CSV and JSON.' },
      { id: 'py_13', title: 'Intermediate - Error Handling', summary: 'try/except, finally, custom exceptions.' },
      { id: 'py_14', title: 'Intermediate - Object-Oriented Programming (OOP)', summary: 'Classes and objects, constructors, inheritance, encapsulation, polymorphism.' },
      { id: 'py_15', title: 'Upper Intermediate - Virtual Environments and Package Management', summary: 'venv, pip, requirements.txt.' },
      { id: 'py_16', title: 'Upper Intermediate - Working with Libraries', summary: 'NumPy, Pandas, Requests, Matplotlib.' },
      { id: 'py_17', title: 'Upper Intermediate - Testing', summary: 'Unit testing, pytest, debugging techniques.' },
      { id: 'py_18', title: 'Upper Intermediate - Working with APIs', summary: 'REST APIs, JSON handling, authentication basics.' },
      { id: 'py_19', title: 'Upper Intermediate - Databases', summary: 'SQLite, CRUD operations, ORM basics (SQLAlchemy).' },
      { id: 'py_20', title: 'Advanced - Advanced Python Concepts', summary: 'Generators, decorators, context managers, iterators.' },
      { id: 'py_21', title: 'Advanced - Concurrency and Parallelism', summary: 'Threading, multiprocessing, async programming.' },
      { id: 'py_22', title: 'Advanced - Performance Optimization', summary: 'Profiling, memory management, efficient algorithms.' },
      { id: 'py_23', title: 'Advanced - Security Basics', summary: 'Input validation, safe file handling, environment variables.' },
      { id: 'py_24', title: 'Data & AI - Data Analysis with Pandas', summary: 'Data analysis workflows with Pandas.' },
      { id: 'py_25', title: 'Data & AI - Data Visualization', summary: 'Charts and visualizations.' },
      { id: 'py_26', title: 'Data & AI - Machine Learning', summary: 'scikit-learn, TensorFlow, PyTorch.' },
      { id: 'py_27', title: 'Data & AI - AI and LLM integration', summary: 'Integrating with AI and large language models.' },
      { id: 'py_28', title: 'Web Development - Flask or FastAPI', summary: 'Web frameworks for Python.' },
      { id: 'py_29', title: 'Web Development - Django Framework', summary: 'Django web framework.' },
      { id: 'py_30', title: 'Web Development - Authentication systems', summary: 'User auth in web apps.' },
      { id: 'py_31', title: 'Web Development - Deployment and DevOps', summary: 'Deploying Python applications.' },
      { id: 'py_32', title: 'Automation - Web scraping', summary: 'BeautifulSoup, Selenium.' },
      { id: 'py_33', title: 'Automation - Task automation', summary: 'Automating tasks with Python.' },
      { id: 'py_34', title: 'Automation - CLI tools', summary: 'Command-line interface tools.' }
    ]
  },
  [Subject.SQL]: {
    icon: '🗄️',
    chapters: [
      // MODULE 1: SQL Foundations (Pure PostgreSQL Basics)
      { id: 'sql_m1_1', title: 'Module 1 - Topic 1: What is a Relational Database', summary: 'Core concepts of relational databases: tables, rows, columns, primary keys. Understanding how data is organized in a structured, tabular format and why relational models power most applications. Includes definitions and real-world analogies.' },
      { id: 'sql_m1_2', title: 'Module 1 - Topic 2: Basic Data Types in PostgreSQL', summary: 'Essential PostgreSQL data types: integer, bigint, numeric, text, boolean, date, timestamp, uuid, jsonb. When to use each type, storage implications, and common pitfalls when choosing data types for real applications.' },
      { id: 'sql_m1_3', title: 'Module 1 - Topic 3: CRUD Operations', summary: 'The four fundamental SQL operations: SELECT (reading data), INSERT (adding rows), UPDATE (modifying existing rows), DELETE (removing rows). Syntax patterns, usage examples, and best practices for each operation in PostgreSQL.' },
      { id: 'sql_m1_4', title: 'Module 1 - Topic 4: Filtering and Sorting', summary: 'Refining query results using WHERE clauses with AND/OR logical operators, sorting results with ORDER BY (ASC/DESC), and pagination with LIMIT and OFFSET. Essential for practical data retrieval in any application.' },
      { id: 'sql_m1_5', title: 'Module 1 - Topic 5: Aggregation Functions', summary: 'Summarizing data with aggregate functions: COUNT, SUM, AVG, MIN, MAX. Using GROUP BY to group rows before aggregation, and HAVING to filter aggregated groups. Critical for dashboards, reports, and analytics.' },
      { id: 'sql_m1_6', title: 'Module 1 - Topic 6: Constraints', summary: 'Enforcing data integrity with PostgreSQL constraints: PRIMARY KEY (unique row identifier), NOT NULL (required values), UNIQUE (no duplicate values), CHECK (custom validation rules), DEFAULT (fallback values). How each constraint is defined and why it matters.' },
      { id: 'sql_m1_7', title: 'Module 1 - Topic 7: Basic Joins', summary: 'Combining data from multiple tables using: INNER JOIN (only matching rows), LEFT JOIN (all left rows + matching right), RIGHT JOIN (all right rows + matching left). When to use each, visual mental models, and practical query examples.' },

      // MODULE 2: Data Modeling for Real Systems
      { id: 'sql_m2_1', title: 'Module 2 - Topic 1: One-to-Many Relationships', summary: 'Designing one-to-many relationships in SQL schema: a single user can have many progress records or many point_transactions. How to implement with foreign keys, naming conventions, and real KruMath examples.' },
      { id: 'sql_m2_2', title: 'Module 2 - Topic 2: Many-to-Many Relationships', summary: 'Implementing many-to-many relationships between entities: users to lessons, roles to permissions. Using junction/join tables as the bridge, composite primary keys, and why this pattern is ubiquitous in real applications.' },
      { id: 'sql_m2_3', title: 'Module 2 - Topic 3: Foreign Keys and Referential Actions', summary: 'Defining foreign key constraints to link related tables. Understanding ON DELETE CASCADE (automatically delete child rows) vs. ON DELETE SET NULL (set child column to null). Choosing the right referential action based on your data integrity requirements.' },
      { id: 'sql_m2_4', title: 'Module 2 - Topic 4: Normalization', summary: 'Database normalization principles: avoiding data duplication, not storing computed totals. 1NF, 2NF, 3NF concepts in practical terms. Why denormalizing prematurely causes bugs, and when intentional denormalization is acceptable for performance.' },
      { id: 'sql_m2_5', title: 'Module 2 - Topic 5: Indexes', summary: 'Creating and using indexes: CREATE INDEX syntax, when to add an index (high-cardinality columns, frequently queried columns), composite indexes for multi-column queries, and the trade-off between read speed and write overhead.' },
      { id: 'sql_m2_6', title: 'Module 2 - Topic 6: Unique Composite Keys', summary: 'Enforcing uniqueness across multiple columns using unique composite keys. Example: (user_id, lesson_id) ensures a user has only one progress record per lesson. Critical for progress tracking, points accumulation, and streak systems in KruMath.' },

      // MODULE 3: Intermediate SQL
      { id: 'sql_m3_1', title: 'Module 3 - Topic 1: Subqueries', summary: 'Writing nested SELECT statements: subqueries in WHERE, FROM, and SELECT clauses. Using EXISTS to check for the presence of related rows. When to use subqueries vs. joins, and performance considerations for each approach.' },
      { id: 'sql_m3_2', title: 'Module 3 - Topic 2: CTEs (WITH Clause)', summary: 'Common Table Expressions (WITH clause) for cleaner, more readable complex queries. Breaking down multi-step logic into named, reusable result sets. Recursive CTEs for hierarchical data. CTEs vs. subqueries: readability and query planning.' },
      { id: 'sql_m3_3', title: 'Module 3 - Topic 3: Window Functions', summary: 'Performing calculations across related rows without collapsing them: ROW_NUMBER() for ranking, RANK() for ties-aware ranking, SUM() OVER() for running totals. Essential for leaderboard ranking, cumulative stats, and dashboard summaries.' },
      { id: 'sql_m3_4', title: 'Module 3 - Topic 4: CASE Statements', summary: 'Adding conditional logic inside SQL queries using CASE WHEN THEN ELSE END. Use cases: categorizing rows, computing dynamic labels, conditional aggregation. How CASE replaces if/else logic at the database layer.' },
      { id: 'sql_m3_5', title: 'Module 3 - Topic 5: Transactions', summary: 'Grouping multiple SQL statements into an atomic unit with BEGIN, COMMIT, and ROLLBACK. Understanding ACID properties, why transactions prevent partial updates, and how to handle errors within a transaction block.' },
      { id: 'sql_m3_6', title: 'Module 3 - Topic 6: Upserts (INSERT ... ON CONFLICT)', summary: 'INSERT ... ON CONFLICT DO UPDATE syntax for upsert operations: insert if not exists, update if it does. Critical patterns for leaderboard ranking updates, points accumulation, streak calculation, and dashboard summary queries without race conditions.' },

      // MODULE 4: Supabase-Specific SQL
      { id: 'sql_m4_1', title: 'Module 4 - Topic 1: Row Level Security (RLS)', summary: 'Enabling and configuring Row Level Security in Supabase: ENABLE ROW LEVEL SECURITY on a table, CREATE POLICY with USING (read filter) and WITH CHECK (write filter). Why RLS removes the need to trust the frontend with data access decisions.' },
      { id: 'sql_m4_2', title: 'Module 4 - Topic 2: Auth Integration with RLS Policies', summary: 'Using Supabase auth helper functions in policies: auth.uid() to get the current user ID, auth.role() to check the user role. How these functions make policies dynamic per-request without hardcoding user IDs.' },
      { id: 'sql_m4_3', title: 'Module 4 - Topic 3: Writing Practical RLS Policies', summary: 'Designing RLS policies for real scenarios: users can only see their own progress rows, public leaderboard visibility for all authenticated users, admin override policies that bypass user-level restrictions. Policy examples for each case.' },
      { id: 'sql_m4_4', title: 'Module 4 - Topic 4: PostgreSQL Functions (RPC)', summary: 'Creating server-side logic with CREATE FUNCTION: defining RETURNS type, LANGUAGE plpgsql, and SECURITY DEFINER (runs with owner privileges). How Supabase exposes functions as RPC endpoints callable from the client.' },
      { id: 'sql_m4_5', title: 'Module 4 - Topic 5: Triggers', summary: 'Automating actions with CREATE TRIGGER: BEFORE INSERT and AFTER INSERT event hooks on tables. Writing trigger functions in PL/pgSQL. Triggers vs. application-level logic: when server-side automation is safer and more reliable.' },
      { id: 'sql_m4_6', title: 'Module 4 - Topic 6: Automatic Logic with Triggers', summary: 'End-to-end automatic workflows using triggers: when a quiz is completed → insert a point_transaction row; when a point_transaction is inserted → update total_points via trigger; when daily activity occurs → update the streak. Removing frontend trust entirely.' },

      // MODULE 5: Performance Engineering
      { id: 'sql_m5_1', title: 'Module 5 - Topic 1: Query Planning with EXPLAIN', summary: 'Using EXPLAIN and EXPLAIN ANALYZE to inspect how PostgreSQL executes a query: reading query plans, identifying Sequential Scan vs. Index Scan, understanding cost estimates and actual timing. The first step in diagnosing slow queries.' },
      { id: 'sql_m5_2', title: 'Module 5 - Topic 2: Index Strategy', summary: 'Choosing the right index type: B-tree indexes for equality and range queries (default), partial indexes for filtering subsets of rows (e.g. WHERE is_active = true). When an index helps vs. hurts, covering indexes, and unused index cleanup.' },
      { id: 'sql_m5_3', title: 'Module 5 - Topic 3: Avoiding N+1 Queries', summary: 'Understanding the N+1 query problem: fetching a list then querying each item individually. Solutions: JOINs, subqueries, or batch fetching. How N+1 scales catastrophically and why it kills performance on education platforms with many users.' },
      { id: 'sql_m5_4', title: 'Module 5 - Topic 4: Materialized Views for Caching', summary: 'Creating MATERIALIZED VIEWs to pre-compute and cache expensive query results, such as leaderboard rankings. How they differ from regular views, REFRESH MATERIALIZED VIEW, and strategies for keeping them updated without sacrificing performance.' },
      { id: 'sql_m5_5', title: 'Module 5 - Topic 5: Denormalized Summary Tables', summary: 'Using denormalized summary tables (e.g. a user_stats table) to avoid scanning the entire history on every request. Trade-offs: faster reads, more complex writes. The pattern for KruMath: pre-aggregated totals updated via triggers or batch jobs.' },
      { id: 'sql_m5_6', title: 'Module 5 - Topic 6: Batch Updates and Leaderboard Optimization', summary: 'Performing efficient batch updates instead of row-by-row operations. Optimizing the KruMath leaderboard: materialized views, scheduled refreshes, and ensuring the dashboard summary never scans the entire point_transactions history on each load.' },

      // MODULE 6: Advanced PostgreSQL
      { id: 'sql_m6_1', title: 'Module 6 - Topic 1: JSONB Operations', summary: 'Working with the JSONB data type in PostgreSQL: using -> (get JSON object field) and ->> (get JSON field as text) operators, @> (contains) for filtering, and creating GIN indexes on JSONB columns for fast lookups.' },
      { id: 'sql_m6_2', title: 'Module 6 - Topic 2: Advanced Constraints and Generated Columns', summary: 'Advanced PostgreSQL constraints: exclusion constraints to prevent overlapping ranges or conflicting row combinations. Generated columns: columns whose values are automatically computed from other columns, stored or virtual.' },
      { id: 'sql_m6_3', title: 'Module 6 - Topic 3: Table Partitioning', summary: 'Partitioning large tables in PostgreSQL for performance and manageability. Range partitioning for a point_transactions table by date. How partitioning improves query pruning and maintenance operations like VACUUM on large datasets.' },
      { id: 'sql_m6_4', title: 'Module 6 - Topic 4: Full Text Search and Advisory Locks', summary: 'Implementing full-text search in PostgreSQL using tsvector and tsquery. Advisory locks for application-level locking (pg_advisory_lock) to prevent race conditions in processes that cannot rely on row-level locks.' },
      { id: 'sql_m6_5', title: 'Module 6 - Topic 5: Extensions in Supabase', summary: 'Useful PostgreSQL extensions available in Supabase: pgcrypto (cryptographic functions for hashing/encryption), uuid-ossp (UUID generation functions), pgvector (vector similarity search for AI/ML embeddings). How to enable and use each extension.' },

      // MODULE 7: Production Database Architecture
      { id: 'sql_m7_1', title: 'Module 7 - Topic 1: Migration Strategy', summary: 'Managing database schema changes safely with versioned SQL migrations. Tools and conventions: sequential migration files, forward-only migrations, rollback strategies. How Supabase handles migrations and best practices for team environments.' },
      { id: 'sql_m7_2', title: 'Module 7 - Topic 2: Backup Strategy and Audit Logs', summary: 'Planning database backups: point-in-time recovery, logical backups with pg_dump, Supabase automatic backups. Implementing audit log tables to record who changed what and when — a critical requirement for production systems with user data.' },
      { id: 'sql_m7_3', title: 'Module 7 - Topic 3: Multi-Environment Setup', summary: 'Managing separate database environments for dev, staging, and production. Environment-specific configurations, promoting schemas across environments, keeping environments in sync, and preventing production data from leaking into lower environments.' },
      { id: 'sql_m7_4', title: 'Module 7 - Topic 4: Security Hardening', summary: 'Hardening a Supabase database for production: removing public anon access from sensitive tables, restricting the service_role key to trusted server-side contexts only, principle of least privilege for roles, and auditing RLS policies for gaps.' },
      { id: 'sql_m7_5', title: 'Module 7 - Topic 5: Monitoring and Slow Query Detection', summary: 'Setting up database monitoring: detecting slow queries with pg_stat_statements, identifying missing indexes via query plans, Supabase dashboard metrics. Alerting on query latency spikes and proactive performance management in a live education platform.' }
    ]
  },
  [Subject.TLAPlus]: {
    icon: '🔬',
    chapters: [
      // MODULE 0: Prerequisites
      { id: 'tla_m0_1', title: 'Module 0 - Topic 1: Discrete Math for TLA+', summary: 'Essential mathematical prerequisites for TLA+: sets (membership, union, intersection, power set), relations, functions, and mathematical logic. Understanding these building blocks is non-negotiable before writing any TLA+ specification.' },
      { id: 'tla_m0_2', title: 'Module 0 - Topic 2: Predicate Logic', summary: 'Predicate logic fundamentals required for TLA+: universal quantification (∀), existential quantification (∃), logical implication, contrapositive, invariants, and how these translate directly into TLA+ expressions like \\A x \\in S : P(x).' },
      { id: 'tla_m0_3', title: 'Module 0 - Topic 3: State Machines and Concurrency Concepts', summary: 'State machine fundamentals: states, transitions, initial states, and reachability. Concurrency concepts required for TLA+: race conditions, mutual exclusion, deadlock, liveness, and why these are impossible to reason about rigorously without a formal model.' },
      { id: 'tla_m0_4', title: 'Module 0 - Topic 4: Distributed Systems Concepts', summary: 'Key distributed systems prerequisites: message passing, network failures, partial failures, consensus, safety vs. liveness properties. Understanding why distributed systems are hard to reason about and how formal methods help catch subtle bugs before production.' },

      // MODULE 1: Foundations of TLA+
      { id: 'tla_m1_1', title: 'Module 1 - Topic 1: What is TLA+', summary: 'Introduction to TLA+ by Leslie Lamport: history, motivation, and the class of problems it solves. The critical mental shift from implementation (how to compute) to specification (what behaviors are correct). TLA+ describes behaviors as infinite sequences of state transitions, not line-by-line algorithms.' },
      { id: 'tla_m1_2', title: 'Module 1 - Topic 2: Installing and Using the TLA+ Toolbox', summary: 'Setting up the TLA+ Toolbox IDE and TLC model checker. The core workflow: write a spec → define a model (constant values, state constraints) → run TLC → interpret counterexamples → fix the spec. Understanding what TLC actually checks and its output format.' },
      { id: 'tla_m1_3', title: 'Module 1 - Topic 3: Core TLA+ Syntax', summary: 'The essential TLA+ building blocks: CONSTANTS (parameters), VARIABLES (mutable state), ASSUME (parameter constraints), Init (initial state predicate), Next (next-state action relation), and Invariants. Understanding that a "state" is simply an assignment of values to all variables.' },
      { id: 'tla_m1_4', title: 'Module 1 - Topic 4: Mathematical Foundations in TLA+', summary: 'Fluency with TLA+ mathematical notation: sets (\\in, \\cup, \\cap, \\subseteq, SUBSET), functions ([f \\in S -> T]), sequences (<<a, b, c>>, Append, Head, Tail), records ([field |-> value]), tuples, and boolean logic. These are not optional — every TLA+ spec uses them heavily.' },

      // MODULE 2: Temporal Logic Core
      { id: 'tla_m2_1', title: 'Module 2 - Topic 1: State Predicates vs Actions', summary: 'The fundamental distinction in TLA+: state predicates (properties of a single state, e.g. x > 0) vs. actions (relations between two states, e.g. x\' = x + 1). The prime operator (x\') means the next-state value of variable x. Every Next action is written in terms of primed variables.' },
      { id: 'tla_m2_2', title: 'Module 2 - Topic 2: Temporal Operators', summary: 'Linear Temporal Logic (LTL) operators in TLA+: [] P (always P — P holds in every state), <> P (eventually P — P holds in some future state), P ~> Q (leads-to — whenever P holds, Q eventually holds). These are used to express safety and liveness properties over infinite behaviors.' },
      { id: 'tla_m2_3', title: 'Module 2 - Topic 3: Behaviors, Safety, and Liveness', summary: 'A TLA+ behavior is an infinite sequence of states. Safety properties say "something bad never happens" (e.g. invariants, []P). Liveness properties say "something good eventually happens" (e.g. <>P). Fairness is required to rule out stuttering behaviors. You must clearly distinguish these three concepts.' },

      // MODULE 3: Writing Real Specifications
      { id: 'tla_m3_1', title: 'Module 3 - Topic 1: Modeling Simple Systems', summary: 'Writing first real TLA+ specifications: a counter (increment/decrement with bounds), a stack (push/pop with LIFO invariant), a bounded queue (enqueue/dequeue with capacity), and a simple cache. These drill the Init/Next pattern and invariant checking workflow with TLC.' },
      { id: 'tla_m3_2', title: 'Module 3 - Topic 2: Modeling Concurrency', summary: 'Extending TLA+ specs to multiple concurrent processes: modeling interleaving semantics (any enabled action can fire), mutual exclusion requirements, and classical concurrency algorithms. Studying Peterson\'s mutual exclusion algorithm as a TLA+ spec and verifying its safety invariant with TLC.' },
      { id: 'tla_m3_3', title: 'Module 3 - Topic 3: Modeling Distributed Systems', summary: 'TLA+ patterns for distributed systems: message-passing with explicit message bags/sets, network nondeterminism (messages can be lost, reordered, or duplicated), failure modeling (process crash as a spec action), and retry logic. Capturing unbounded nondeterminism is where TLA+ shines.' },
      { id: 'tla_m3_4', title: 'Module 3 - Topic 4: Nondeterminism in TLA+', summary: 'TLA+ embraces nondeterminism by design. Key patterns: existential choice (\\E x \\in S : action), disjunctive next-state (\\/  for OR), and the CHOOSE operator (deterministic choice of an arbitrary element). Understanding that TLC explores ALL possible nondeterministic choices is what makes model checking exhaustive.' },

      // MODULE 4: Invariants and Model Checking
      { id: 'tla_m4_1', title: 'Module 4 - Topic 1: Writing and Checking Invariants', summary: 'Defining formal invariants in TLA+: boolean predicates that must hold in every reachable state. Example: MutualExclusion == ~(pc[1] = "cs" /\\ pc[2] = "cs"). Adding invariants to a TLC model and interpreting the output when TLC finds a violating state. The discipline of thinking in invariants.' },
      { id: 'tla_m4_2', title: 'Module 4 - Topic 2: Using TLC Effectively', summary: 'TLC model checking techniques: state constraints (ASSUME bounds), symmetry reduction (interchangeable model values), checking liveness properties (temporal formulas), and reading counterexample traces. TLC traces show the exact sequence of states leading to a violation — learning to read them is essential.' },
      { id: 'tla_m4_3', title: 'Module 4 - Topic 3: The State Explosion Problem', summary: 'Why model checking is fundamentally limited by state space size: state explosion occurs when the number of reachable states grows exponentially with system size. Techniques to combat it: abstraction (coarser models), symmetry reduction, state constraints, and knowing when a small model is representative.' },

      // MODULE 5: Advanced TLA+ Concepts
      { id: 'tla_m5_1', title: 'Module 5 - Topic 1: Refinement', summary: 'Refinement is the core of serious TLA+ usage: an abstract spec defines WHAT is correct, a concrete implementation spec defines HOW it is done. A refinement mapping (INSTANCE with substitutions) proves the concrete spec satisfies the abstract spec. This is how TLA+ scales to real system design.' },
      { id: 'tla_m5_2', title: 'Module 5 - Topic 2: Modules and Composition', summary: 'Structuring large TLA+ specifications: EXTENDS (import another module\'s definitions), INSTANCE (instantiate a parameterized module with specific values), and parameterized modules. Module composition allows building complex specs from reusable, verified components.' },
      { id: 'tla_m5_3', title: 'Module 5 - Topic 3: Fairness — WF and SF', summary: 'Fairness constraints in TLA+ ensure liveness properties are checkable. Weak fairness WF_vars(A): if action A is continuously enabled, it must eventually fire. Strong fairness SF_vars(A): if A is infinitely often enabled, it must fire infinitely often. Knowing which to use is critical for liveness proofs.' },
      { id: 'tla_m5_4', title: 'Module 5 - Topic 4: PlusCal', summary: 'PlusCal is an algorithm language that compiles to TLA+. It bridges algorithmic thinking (imperative pseudocode with processes, variables, labels) and formal TLA+ specs. Learning PlusCal\'s process syntax, variable declarations, fairness annotations, and how the translation to TLA+ works under the hood.' },

      // MODULE 6: Industrial-Level Modeling
      { id: 'tla_m6_1', title: 'Module 6 - Topic 1: Consensus Algorithm Specifications', summary: 'Modeling industrial consensus algorithms in TLA+: Two-Phase Commit (atomicity of distributed transactions), Paxos (safety and liveness of single-decree consensus), and Raft (leader election and log replication). Understanding how TLA+ specs catch subtle safety bugs that code review misses.' },
      { id: 'tla_m6_2', title: 'Module 6 - Topic 2: Real-World Case Studies (AWS and Microsoft)', summary: 'How Amazon Web Services and Microsoft use TLA+ in production: AWS uses TLA+ to verify distributed storage services (S3, DynamoDB, EBS) and found 10 serious bugs in 7 systems. Microsoft uses it for distributed protocols in Azure. Studying the specific bugs that formal methods caught.' },
      { id: 'tla_m6_3', title: 'Module 6 - Topic 3: Fault Tolerance Modeling', summary: 'Modeling fault tolerance in TLA+ specifications: crash failure actions (a process permanently stops), message loss (messages in transit can be dropped), message duplication (network retransmits), and Byzantine behavior (processes send arbitrary messages). Verifying that invariants hold even under worst-case faults.' },

      // MODULE 7: Formal Proof with TLAPS
      { id: 'tla_m7_1', title: 'Module 7 - Topic 1: Introduction to TLAPS (TLA+ Proof System)', summary: 'TLAPS moves beyond model checking (finite verification) into theorem proving (infinite verification). Writing hierarchical proof steps in TLAPS syntax, using proof backends (Zenon, Isabelle, SMT solvers), and understanding when proof is necessary vs. model checking sufficient.' },
      { id: 'tla_m7_2', title: 'Module 7 - Topic 2: Inductive Invariants and Hierarchical Proofs', summary: 'The core technique in TLAPS: inductive invariants (invariants that are preserved by every step of Next). Proof structure: base case (Init => Inv), inductive step (Inv /\\ Next => Inv\'). Hierarchical proof decomposition into sub-goals that proof backends can discharge automatically.' },

      // MODULE 8: Expert Level
      { id: 'tla_m8_1', title: 'Module 8 - Topic 1: Specification Patterns and Large-Scale Organization', summary: 'Expert-level TLA+ patterns: common specification idioms (history variables, prophecy variables, auxiliary variables for refinement). Organizing large multi-module specs for readability and maintainability. Naming conventions, module boundaries, and documentation standards for production-grade TLA+ specs.' },
      { id: 'tla_m8_2', title: 'Module 8 - Topic 2: Compositional Reasoning', summary: 'Compositional reasoning in TLA+: specifying system components independently and reasoning about their composition. Rely-guarantee reasoning (what a component assumes about its environment vs. what it guarantees). How composition of correct components can still produce incorrect systems without careful interface specs.' },
      { id: 'tla_m8_3', title: 'Module 8 - Topic 3: Refinement-Driven Development and Spec-First Architecture', summary: 'The expert workflow: write an abstract TLA+ spec first (what the system must do), refine it into a concrete spec (how it will do it), then implement the concrete spec. Spec-first architecture design: using TLA+ before writing a single line of production code to validate the design. How this catches design errors that are impossible to fix late.' }
    ]
  }
};
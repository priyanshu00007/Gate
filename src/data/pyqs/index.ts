// Auto-generated index - year/shift structure matching official GATE CSE pattern
// Single shift: 2007-2013, 2018-2020, 2022-2023
// Double shift: 2016,2017,2021,2024-2026
// Triple shift: 2014,2015

import p2007cs from './2007/cs.json';
import p2008cs from './2008/cs.json';
import p2009cs from './2009/cs.json';
import p2010cs from './2010/cs.json';
import p2011cs from './2011/cs.json';
import p2012cs from './2012/cs.json';
import p2013cs from './2013/cs.json';
import p2014s1 from './2014/shift1.json';
import p2014s2 from './2014/shift2.json';
import p2014s3 from './2014/shift3.json';
import p2015s1 from './2015/shift1.json';
import p2015s2 from './2015/shift2.json';
import p2015s3 from './2015/shift3.json';
import p2016s1 from './2016/shift1.json';
import p2016s2 from './2016/shift2.json';
import p2017s1 from './2017/shift1.json';
import p2017s2 from './2017/shift2.json';
import p2018cs from './2018/cs.json';
import p2019cs from './2019/cs.json';
import p2020cs from './2020/cs.json';
import p2021s1 from './2021/shift1.json';
import p2021s2 from './2021/shift2.json';
import p2022cs from './2022/cs.json';
import p2023cs from './2023/cs.json';
import p2024s1 from './2024/shift1.json';
import p2024s2 from './2024/shift2.json';
import p2025s1 from './2025/shift1.json';
import p2025s2 from './2025/shift2.json';
import p2026s1 from './2026/shift1.json';
import p2026s2 from './2026/shift2.json';

export interface PaperMeta {
  year: number;
  shifts: string[];
  label: string;
  files: Record<string, any[]>;
}

export const PAPERS: Record<string, PaperMeta> = {
  '2007-cs': { year: 2007, shifts: ['cs'], label: 'CS', files: { cs: p2007cs as any } },
  '2008-cs': { year: 2008, shifts: ['cs'], label: 'CS', files: { cs: p2008cs as any } },
  '2009-cs': { year: 2009, shifts: ['cs'], label: 'CS', files: { cs: p2009cs as any } },
  '2010-cs': { year: 2010, shifts: ['cs'], label: 'CS', files: { cs: p2010cs as any } },
  '2011-cs': { year: 2011, shifts: ['cs'], label: 'CS', files: { cs: p2011cs as any } },
  '2012-cs': { year: 2012, shifts: ['cs'], label: 'CS', files: { cs: p2012cs as any } },
  '2013-cs': { year: 2013, shifts: ['cs'], label: 'CS', files: { cs: p2013cs as any } },
  '2014': { year: 2014, shifts: ['shift1','shift2','shift3'], label: '3 SHIFTS', files: { shift1: p2014s1 as any, shift2: p2014s2 as any, shift3: p2014s3 as any } },
  '2015': { year: 2015, shifts: ['shift1','shift2','shift3'], label: '3 SHIFTS', files: { shift1: p2015s1 as any, shift2: p2015s2 as any, shift3: p2015s3 as any } },
  '2016': { year: 2016, shifts: ['shift1','shift2'], label: '2 SHIFTS', files: { shift1: p2016s1 as any, shift2: p2016s2 as any } },
  '2017': { year: 2017, shifts: ['shift1','shift2'], label: '2 SHIFTS', files: { shift1: p2017s1 as any, shift2: p2017s2 as any } },
  '2018-cs': { year: 2018, shifts: ['cs'], label: 'CS', files: { cs: p2018cs as any } },
  '2019-cs': { year: 2019, shifts: ['cs'], label: 'CS', files: { cs: p2019cs as any } },
  '2020-cs': { year: 2020, shifts: ['cs'], label: 'CS', files: { cs: p2020cs as any } },
  '2021': { year: 2021, shifts: ['shift1','shift2'], label: '2 SHIFTS', files: { shift1: p2021s1 as any, shift2: p2021s2 as any } },
  '2022-cs': { year: 2022, shifts: ['cs'], label: 'CS', files: { cs: p2022cs as any } },
  '2023-cs': { year: 2023, shifts: ['cs'], label: 'CS', files: { cs: p2023cs as any } },
  '2024': { year: 2024, shifts: ['shift1','shift2'], label: '2 SHIFTS', files: { shift1: p2024s1 as any, shift2: p2024s2 as any } },
  '2025': { year: 2025, shifts: ['shift1','shift2'], label: '2 SHIFTS', files: { shift1: p2025s1 as any, shift2: p2025s2 as any } },
  '2026': { year: 2026, shifts: ['shift1','shift2'], label: '2 SHIFTS', files: { shift1: p2026s1 as any, shift2: p2026s2 as any } },
};

export const PAPER_IDS = Object.keys(PAPERS).sort();

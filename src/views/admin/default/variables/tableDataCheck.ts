type RowObj = {
	name: [string, boolean];
	progress: string;
	quantity: number;
	date: string;
	info: boolean;
};

const tableDataCheck: RowObj[] = [
	{
		name: [ 'Jira #1 ', true ],
		quantity: 2458,
		progress: '17.5%',
		date: '12 Jan 2021',
		info: true
	},
	{
		name: [ 'Jira #2', true ],
		quantity: 1485,
		progress: '10.8%',
		date: '21 Feb 2021',
		info: true
	},
	{
		name: [ 'Jira #3', true ],
		quantity: 1024,
		progress: '21.3%',
		date: '13 Mar 2021',
		info: true
	},
	{
		name: [ 'Jira #4', true ],
		quantity: 858,
		progress: '31.5%',
		date: '24 Jan 2021',
		info: true
	},
	{
		name: [ 'Jira #5', true ],
		quantity: 258,
		progress: '12.2%',
		date: '24 Oct 2022',
		info: true
	}
];

export default tableDataCheck;

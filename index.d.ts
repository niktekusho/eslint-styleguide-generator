declare namespace Lib {
	/**
	 * Interface
	 */
	export interface Interface {
	}

}

// Here declare const or function based on what you export in index.js
declare function Lib(): any;

export = Lib;

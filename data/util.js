export const DB_NULL = "'NULL'";

export function stringOrNull(x){
	if( !x || x == "")
		return "'NULL'";
	else
		return "'" + x.replace(/\(/g, '//(').replace(/\)/g, '//)').replace(/'/g, "''") + "'";
}
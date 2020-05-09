export class Branch {
    branchId: number;
    branchName: string;
    relTenantInstitutionId: number;
    sections: Array<Section>
    
    constructor() {
        this.sections = new Array<Section>();
    }
}

class Section {
    
}
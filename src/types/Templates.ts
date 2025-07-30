// export interface EditTemplatePayload {
//     id: number;
//     newTemplate: string;
//   }


//  export interface TemplatesState {
//     template: string | null;
//     loading: boolean;
//     error: string | null;
//   }
  
//   export const initialState: TemplatesState = {
//     template: null,
//     loading: false,
//     error: null,
//   };

//   export interface Template {
//     id: number;
//     name: string;
//     template: string; 
  
//   }

// export interface TemplateViewerProps {
//     templateName: string;
// }
  

export interface Template {
  id: number;
  name: string;
  templateContent: string;
  lastModified: string;
}

export interface TemplateCreationData {
  name: string;
  content: string;
}

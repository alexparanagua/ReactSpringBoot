interface ImageCardProps {
    nome?: string;
    tamanho?: string;
    dataUpload?: string;
    src?: string;
    extension?: string;
}


export const formatBytes = (bytes: string | number = ''): string => {
  const b = Number(bytes);
  if (!b || b <= 0) return '0 B';
  
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(b) / Math.log(1024));
  
  return `${parseFloat((b / Math.pow(1024, i)).toFixed(2))} ${sizes[i]}`;
};


export const ImageCard: React.FC<ImageCardProps> = (props: ImageCardProps) => {
    function download(){
        window.open(props.src,'_blank')
    }

    return (
        <div className="card relative bg-white rounded-md shadow-md transition-transform ease-in duration-300 transform hover:shadow-lg hover:-translate-y-2">
            <img src={props.src} className="h-56 w-full object-cover rounded-t-md" alt=""/>
            <div className="card-body p-4">
                <h5 className="text-xl font-semibold mb-2 text-gray-600">{props.nome+'.'+props.extension}</h5>
                <p className="text-gray-600">{formatBytes(props.tamanho)}</p>
                <p className="text-gray-600">{props.dataUpload}</p>
                <p><button className="border px-2 bg-gray-300" onClick={download}>Download</button></p>
            </div>
        </div>
    )
}
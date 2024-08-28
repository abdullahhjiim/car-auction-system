'use client';
import { authAxios } from '/app/(home)/axious-config';
import { useEffect, useState } from 'react';

const DocumentFile = ({ data }) => {
  const [documentsData, setDocumentsData] = useState([]);

  useEffect(() => {
    authAxios
      .get('/members/documents')
      .then((res) => {
        const _data = res.data?.data;
        setDocumentsData(_data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const labelOfStatus = {
    1: 'text-green-500',
    2: 'text-blue-500',
    5: 'text-red-500',
    10: 'text-red-300',
  };

  return (
    <div className="mb-16">
      {documentsData.length > 0 && (
        <div className="bg-white shadow-light rounded-md pb-4 lg:w-[73%] ">
          <h4 className="p-4 text-2xl font-semibold">My Document</h4>
          {documentsData.map((e) => {
            return (
              <div key={e.id} className="bg-white overflow-x-auto p-3 mb-3">
                <table className="w-full mb-2 flex flex-col min-w-[500px] overflow-x-auto">
                  <thead>
                    <tr className="text-left flex gap-x-2">
                      <th className="w-[35%] sm:w-1/4 whitespace-wrap overflow-hidden">
                        {e.type_name}
                      </th>
                      <th className="w-1/4">Uploaded Date</th>
                      <th className="w-[15%] sm:w-1/4">Status</th>
                      <th className="w-1/4">Attachment</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="text-left flex gap-x-2 mt-2">
                      <td className="w-[35%] sm:w-1/4">{e?.country_name}</td>
                      <td className="w-1/4">{e?.uploaded_on}</td>
                      <td className="font-bold text-sm w-[15%] sm:w-1/4">
                        <span className={labelOfStatus[e.status]}>
                          {e?.status_name}
                        </span>
                      </td>
                      <td className="font-bold text-sm w-1/4">
                        <a
                          href={e?.url}
                          target="_blank"
                          className="px-1 py-1 bg-primary text-white rounded-md hover:bg-opacity-70 duration-200"
                        >
                          Preview
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <hr />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default DocumentFile;

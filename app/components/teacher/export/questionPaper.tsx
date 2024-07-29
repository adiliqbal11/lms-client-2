import React, { useEffect, useRef, useState } from 'react'
import { Question } from '../../../shared/types';
import _ from 'lodash';
type ProcessedStrings = [string, string];
interface QuestionPaperProps {
    filteredMcqQuestions: Question[],
    filteredShortQuestions: Question[],
    filteredLongQuestions: Question[],
    filteredFillInTheBlanksQuestions: Question[],
    filteredMultiFillInTheBlanksQuestions: Question[],
    filteredMultipleShortQuestions: Question[],
    filteredSequenceQuestions: Question[],
    filteredMultipleTrueFalseQuestions: Question[],
    filteredMultipleQuestionV2Questions: Question[],
    download: boolean,
    mode: boolean
}
let counter = 0;
const QuestionPaper: React.FC<QuestionPaperProps> = ({ mode, filteredFillInTheBlanksQuestions, filteredLongQuestions, filteredMcqQuestions, filteredMultiFillInTheBlanksQuestions, filteredMultipleShortQuestions, filteredMultipleTrueFalseQuestions, filteredSequenceQuestions, filteredShortQuestions, filteredMultipleQuestionV2Questions, download }) => {
    const [globalCounter, setGlobalCounter] = useState<number>(0);
    const processInputStringV2 = (inputString: string): [string, string] => {
        const extractedPattern = inputString.match(/--\s*(.*?)\s*--/)?.[1] || '';
        const modifiedPattern = extractedPattern.replace(/d22/g, '_');
        const cleanedString = inputString.replace(/--\s*(.*?)\s*--/, '').replace(/d22/g, '_');
        return [modifiedPattern, cleanedString];
    }
    const [isDownloadFirstTime, setIsDownloadFirstTime] = useState<boolean>(false)
    const downloadable = useRef<HTMLDivElement>(null);
    const extractWordsBetweenMarkers = (inputString: string): string[] => {
        // Regular expression to match words between "-- --"
        const regex = /--\s*(.*?)\s*--/g;

        // Set to store unique words
        const uniqueWords = new Set<string>();

        let match: RegExpExecArray | null;
        const uniqueWordsArray: string[] = [];
        while ((match = regex.exec(inputString)) !== null) {
            match?.[1]?.split(',')?.forEach(word => {
                const trimmedWord = word?.trim();
                if (trimmedWord !== '') {
                    uniqueWordsArray?.push(trimmedWord);
                }
            });
        }
        return uniqueWordsArray;
    }
    const processInputString = (inputString: string): ProcessedStrings => {
        const matches = inputString?.match(/DASH(\d+)/g) || [];

        let originalString: string = inputString;
        let modifiedString: string = inputString;
        let getAnswers = extractWordsBetweenMarkers(inputString);

        matches?.forEach((match: string, index: number) => {
            let replacement = getAnswers[index];
            originalString = originalString?.replace(match, replacement);
            modifiedString = modifiedString?.replace(match, '__________________');
        });

        modifiedString = modifiedString?.replace(/--\s*(.*?)\s*--/g, ''); // Remove words between '--'
        originalString = originalString?.replace(/--\s*(.*?)\s*--/g, ''); // Remove words between '--' in the original string as well

        return [modifiedString, originalString];
    };
    const CreateMcqQuestion = () => {
        return (
            <>
                {filteredMcqQuestions?.flatMap((question, index) => {
                    counter++;
                    return (
                        <>
                            <div key={index}>
                                <h5 style={{ color: '#000' }}>{index + 1}. {question?.question}</h5>
                            </div>
                            <div key={index} style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                                {
                                    question?.answers?.map((answer, ansIndex) => {
                                        return (
                                            <>
                                                <div key={ansIndex} style={{ width: '47.99%', marginBottom: '10px' }}>
                                                    <div style={{ display: 'flex' }}>
                                                        <div style={{ width: '15px', height: '15px', border: '2px solid #000' }}><b style={{ color: "skyblue" }}>{mode ? (answer?.isCorrect ? '✔' : '✘') : ''}</b></div>
                                                        <label style={{ marginLeft: '10px', lineHeight: '15px' }}>{answer?.answer}</label>
                                                    </div>
                                                </div>
                                            </>
                                        )
                                    })
                                }
                            </div>
                        </>
                    )
                })}
            </>
        )
    }
    const CreateSequenceQuestion = () => {
        return (
            <>
                {filteredSequenceQuestions?.flatMap((question, index) => {
                    return (
                        <>
                            <div key={index}>
                                <h4 style={{ color: '#000' }}>{index + 1 + filteredMcqQuestions?.length}. {question?.question}</h4>
                            </div>
                            <div key={index} style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                                {
                                    question?.answers?.map((answer, ansIndex) => {
                                        return (
                                            <>
                                                <div key={ansIndex} style={{ width: '47.99%', marginBottom: '10px' }}>
                                                    <img src={(!_?.isEmpty(answer?.answerImage) ? answer?.answerImage : "https://cdni.iconscout.com/illustration/premium/thumb/dna-sequence-cloning-and-recombination-biotechnology-2974924-2477355.png?f=webp")} alt="Description" style={{ width: '80%' }} />
                                                    <div style={{ display: 'flex' }}>
                                                        <div style={{ width: '20px', height: '20px', border: '2px solid #000' }}><b style={{ color: "skyblue" }}>{mode ? String(answer?.sequenceNo) : ''}</b></div>
                                                        <label style={{ marginLeft: '10px', lineHeight: '25px' }}>{answer?.answer}</label>
                                                    </div>
                                                </div>
                                            </>
                                        )
                                    })
                                }
                            </div>
                        </>
                    )
                })}
            </>
        )
    }
    const CreateMultiFillInTheBlanks = () => {
        return (
            <>
                {filteredMultiFillInTheBlanksQuestions?.flatMap((question, index) => {
                    return (
                        <>
                            <div key={index}>
                                <h5 style={{ color: '#000' }}>{index + 1 + filteredMcqQuestions?.length + filteredSequenceQuestions?.length}. {question?.question}</h5>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                                <div style={{ width: '47.99%', marginBottom: '10px' }}>
                                    {
                                        question?.answers?.map((answer, ansIndex) => {

                                            const [modifiedString, originalString] = processInputStringV2(answer?.answer || '');
                                            return (
                                                <>
                                                    <p style={{ color: '#000', marginBottom: '20px' }}>{ansIndex + 1}. {mode ? <>{modifiedString}<hr /></> : originalString}</p>
                                                </>
                                            )
                                        })
                                    }
                                </div>
                                <div style={{ width: '47.99%', marginBottom: '10px' }}>
                                    <img src={question?.questionImage} alt="Description" style={{ width: '50%' }} />
                                </div>
                            </div>
                        </>
                    )
                })}
            </>
        )
    }
    const CreateMultipleTrueFalseQuestion = () => {
        return (
            <>
                {filteredMultipleTrueFalseQuestions?.flatMap((question, index) => {
                    return (
                        <>
                            <div key={index}>
                                <h5 style={{ color: '#000' }}>{index + 1 + filteredMcqQuestions?.length + filteredSequenceQuestions?.length + filteredMultiFillInTheBlanksQuestions?.length}. {question?.question}</h5>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                                <div style={{ width: '47.99%', marginBottom: '10px' }}>
                                    {
                                        question?.answers?.map((answer, ansIndex) => {
                                            return (
                                                <>
                                                    <p style={{ color: '#000', marginBottom: '20px' }}>{ansIndex + 1}. {answer?.answer}</p>
                                                </>
                                            )
                                        })
                                    }
                                </div>
                                <div style={{ width: '47.99%', marginBottom: '10px', marginTop: '-31px' }}>
                                    <div style={{ display: 'flex' }}>
                                        <h4 style={{ marginRight: '10px', marginBottom: '8px' }}>Right</h4>
                                        <h4 style={{ marginLeft: '10px', marginBottom: '8px' }}>Wrong</h4>
                                    </div>

                                    {
                                        question?.answers?.map((answer, ansIndex) => {
                                            return (
                                                <>
                                                    <div style={{ display: 'flex' }}>
                                                        <div className='my-1' style={{ width: '20px', height: '20px', border: '2px solid #000' }}><span style={{ color: "skyBlue" }}>{mode ? `${answer?.isCorrect ? "✔" : ""}` : ``}</span></div>
                                                        <div style={{ width: '20px', height: '20px', border: '2px solid #000', marginLeft: '35px' }}><span style={{ color: "red" }}>{mode ? `${answer?.isCorrect ? "" : "✘"}` : ``}</span></div>
                                                    </div>
                                                </>
                                            )
                                        })
                                    }
                                </div>

                            </div>
                        </>
                    )
                })}
            </>
        )
    }
    const CreateShortQuestion = () => {
        return (
            <>
                {filteredShortQuestions?.flatMap((question, index) => {
                    return (
                        <>
                            <div key={index}>
                                <h6 style={{ color: '#000' }}>{index + 1 + filteredMcqQuestions?.length + filteredSequenceQuestions?.length + filteredMultiFillInTheBlanksQuestions?.length + filteredMultipleTrueFalseQuestions?.length}. {question?.question}</h6>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                                <div style={{ width: '47.99%', marginBottom: '10px' }}>
                                    {
                                        question?.answers?.map((answer, ansIndex) => {
                                            return (
                                                <>
                                                    <p style={{ color: '#000', marginBottom: '20px' }}> {mode ? <> {answer?.answer} <b><hr /></b></> : "_____________________________________________________________________"}</p>
                                                </>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </>
                    )
                })}
            </>
        )
    }
    const CreateLongQuestion = () => {
        return (
            <>
                {filteredLongQuestions?.flatMap((question, index) => {
                    return (
                        <>
                            <div key={index}>
                                <h6 style={{ color: '#000' }}>{index + 1 + filteredMcqQuestions?.length + filteredSequenceQuestions?.length + filteredMultiFillInTheBlanksQuestions?.length + filteredMultipleTrueFalseQuestions?.length + filteredShortQuestions?.length}. {question?.question}</h6>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                                <div style={{ width: '47.99%', marginBottom: '10px' }}>
                                    {
                                        question?.answers?.map((answer, ansIndex) => {
                                            return (
                                                <>
                                                    <p style={{ color: '#000', marginBottom: '20px' }}> {mode ? <> {answer?.answer} <b><hr /></b></> : "_____________________________________________________________________"}</p>
                                                </>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </>
                    )
                })}
            </>
        )
    }
    const CreateMultipleShortQuestion = () => {
        return (
            <>
                {filteredMultipleShortQuestions?.flatMap((question, index) => {
                    counter++;
                    return (
                        <>
                            <div key={index}>
                                <h4 style={{ color: '#000' }}>{globalCounter}. {question?.question}</h4>
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                                <div style={{ width: '47.99%', marginBottom: '10px' }}>
                                    {
                                        question?.answers?.map((answer, ansIndex) => {
                                            return (
                                                <>
                                                    <p style={{ color: '#000', marginBottom: '20px' }}>{ansIndex + 1}. {mode ? <> {answer?.answer} <b><hr /></b></> : "_________________________________________"}</p>
                                                </>
                                            )
                                        })
                                    }
                                </div>
                                <div style={{ width: '47.99%', marginBottom: '10px' }}>
                                    <img src={question?.questionImage} alt="Description" style={{ width: '50%' }} />
                                </div>
                            </div>
                        </>
                    )
                })}
            </>
        )
    }
      const CreateFillInTheBlanksShortQuestion = () => {
        return (
            <>
                {filteredFillInTheBlanksQuestions?.flatMap((question, index) => {
                    counter++;
                    return (
                        <>
                            <div key={index}>
                                <h4 style={{ color: '#000' }}>{globalCounter}. {question?.question}</h4>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                                <div style={{ width: '47.99%', marginBottom: '10px' }}>
                                    {
                                        question?.answers?.map((answer, ansIndex) => {
                                            const [modifiedString, originalString] = processInputString(answer?.answer || '');
                                            return (
                                                <>
                                                    <p style={{ color: '#000', marginBottom: '20px', lineHeight: '33px' }}>{ansIndex + 1}. {mode ? <>{originalString}<hr /></> : modifiedString}</p>
                                                </>
                                            )
                                        })
                                    }
                                </div>
                                <div style={{ width: '25.99%', marginBottom: '5px' }}>
                                    <img src={!_?.isEmpty(question?.questionImage) ? question?.questionImage : "https://www.freepnglogos.com/uploads/thinking-png/thinking-get-started-with-marketing-for-new-retail-business-owners-8.png"} alt="Description" style={{ width: '50%' }} />
                                </div>
                            </div>
                        </>
                    )
                })}
            </>
        )
    }
      const CreateMultipleShortQuestionV2 = () => {
        return (
            <>
                {filteredMultipleQuestionV2Questions?.flatMap((question, index) => {
                    // setGlobalCounter(globalCounter + 1);
                    counter++;
                    return (
                        <>
                            <div key={index}>
                                <h4 style={{ color: '#000' }}>{globalCounter}. {question?.question}</h4>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                                <div style={{ width: '47.99%', marginBottom: '10px' }}>
                                    <div style={{ width: '120%', marginBottom: '10px' }}>
                                        {
                                            question?.answers?.map((answer, ansIndex) => {
                                                return (
                                                    <>
                                                        <p style={{ color: '#000', marginBottom: '20px' }}>{ansIndex + 1}. {answer?.answer}</p>
                                                        <p style={{ color: '#000', marginBottom: '20px' }}>{mode ? <><hr />{answer?.additional}</> : "___________________________________________________________________________"}</p>
                                                    </>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                        </>
                    )
                })}
            </>
        )
    }

    useEffect(() => {
        setGlobalCounter(counter);
    }, []);
    useEffect(() => {

      if(isDownloadFirstTime){
        const printable = downloadable?.current?.innerHTML;
        const printWindow = window.open('', '', 'height=400,width=800');
        printWindow?.document.write('<html><head><title>Question Paper</title>');
        printWindow?.document.write('</head><body >');
        printWindow?.document.write(printable || '');
        printWindow?.document.write('</body></html>');
        printWindow?.print();
        printWindow?.document.close();
    }
    setIsDownloadFirstTime(true)

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [download]);
    return (
        <>
            <div ref={downloadable} contentEditable={true} style={{ position: 'sticky', top: 0, zIndex: 1000, width: '850px', marginLeft: 'auto', marginRight: 'auto' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #a6a6a6' }}>
                    <p style={{ color: '#a6a6a6', fontWeight: 600 }}>Way in LISTENING</p>
                    <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                        <p style={{ color: '#a6a6a6', fontWeight: 600 }}>LISTENING</p>
                        <p style={{ color: '#a6a6a6', fontWeight: 600, border: '3px solid #a6a6a6', borderRadius: '100%', padding: '5px 10px', marginLeft: '20px', marginRight: '30px', marginBottom: '-30px', background: '#fff' }}>2</p>
                    </div>
                </div>
                <br /><br />
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <p style={{ color: '#000' }}>Name: ____________________________</p>
                    <p style={{ color: '#000' }}>Class: __________________</p>
                    <p style={{ color: '#000' }}>Date: __________________</p>
                </div>
                <CreateMcqQuestion />
                <br />
                <CreateSequenceQuestion />
                <br />
                <CreateMultiFillInTheBlanks />
                <br />
                <CreateMultipleTrueFalseQuestion />
                <br />
                <CreateShortQuestion />
                <br />
                <CreateLongQuestion />
                <br />
                {/* <CreateFillInTheBlanksShortQuestion /> */}
                <br />
                {/* <CreateMultipleShortQuestion /> */}
                <br />
                {/* <CreateMultipleShortQuestionV2 /> */}
            </div>
        </>
    )
}

export default QuestionPaper